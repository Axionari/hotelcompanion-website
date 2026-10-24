'use client'

import Image from 'next/image'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, MousePointer2, Pause, Play, RotateCcw, X } from 'lucide-react'
import { OUTCOME_FILMS, captureSource, sceneAt, type FilmScene } from './outcome-sequences'
import { OUTCOME_CROPS, type CaptureCrop } from './outcome-choreography'
import styles from './outcome-demo.module.css'

type DemoProps = { outcome: number; lang: 'en' | 'es' }

/** An exact source-image window. No recreated labels, forms or product controls. */
function Crop({crop,className=''}:{crop:CaptureCrop;className?:string}) {
  const clip=useId()
  return <svg aria-hidden="true" className={`${styles.crop} ${className}`} viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`} style={{aspectRatio:`${crop.width}/${crop.height}`}}>
    <defs><clipPath id={clip}><rect x={crop.x} y={crop.y} width={crop.width} height={crop.height}/></clipPath></defs>
    <image clipPath={`url(#${clip})`} href={captureSource(crop)} x="0" y="0" width="1280" height="800"/>
  </svg>
}

function Scene({scene,index,lang,active}:{scene:FilmScene;index:number;lang:DemoProps['lang'];active:boolean}) {
  return <div className={styles.scene} data-scene={index} data-at={scene.at} aria-hidden={!active}>
    <div className={styles.actor}>{scene.actor==='team' ? (lang==='es'?'VISTA DEL EQUIPO':'TEAM VIEW') : scene.actor==='guest-update' ? (lang==='es'?'VISTA DEL HUÉSPED · ACTUALIZADA':'GUEST VIEW · REFRESHED') : (lang==='es'?'VISTA DEL HUÉSPED':'GUEST VIEW')}</div>
    <div className={`${styles.sceneContent} ${styles[scene.layout]}`}>
      {scene.crops.map((crop,i)=><div key={i} className={styles.sourceRegion}><Crop crop={crop}/>{((scene.layout==='review'&&i===1)||(scene.layout==='record'&&i===0)||(scene.layout==='team'&&i===2))&&<span className={styles.emphasis} data-highlight={scene.at+500} aria-hidden="true"/>}{scene.click?.crop===i&&<span className={styles.pointer} data-click={scene.click.at} style={{left:`${scene.click.x/crop.width*100}%`,top:`${scene.click.y/crop.height*100}%`}} aria-hidden="true"><MousePointer2 size={20} fill="#173e35" stroke="#fff" strokeWidth={1.5}/><i/></span>}</div>)}
    </div>
  </div>
}

export function OutcomeDemo({outcome,lang}:DemoProps) {
  const film=OUTCOME_FILMS[outcome]??OUTCOME_FILMS[0]
  const root=useRef<HTMLDivElement>(null)
  const dialog=useRef<HTMLDialogElement>(null)
  const animations=useRef<Animation[]>([])
  const clock=useRef(0)
  const seekRef=useRef<(time:number)=>void>(()=>{})
  const [current,setCurrent]=useState(0)
  const [paused,setPaused]=useState(false)
  const [reduced,setReduced]=useState(false)
  const [visible,setVisible]=useState(false)
  const [pageVisible,setPageVisible]=useState(true)
  const [expanded,setExpanded]=useState(false)
  const [finished,setFinished]=useState(false)
  const t=(en:string,es:string)=>lang==='es'?es:en
  const scene=film.scenes[current]
  const playing=visible&&pageVisible&&!paused&&!reduced&&!expanded&&!finished

  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    const motion=()=>setReduced(media.matches)
    const visibility=()=>setPageVisible(document.visibilityState==='visible')
    motion(); visibility()
    media.addEventListener('change',motion)
    document.addEventListener('visibilitychange',visibility)
    const observer=new IntersectionObserver(entries=>setVisible(entries.some(entry=>entry.isIntersecting)),{threshold:.2})
    if(root.current) observer.observe(root.current)
    // Only the selected story is warmed. Other journeys load when chosen.
    const crops=[film.intro,...film.messages.map(message=>message.crop),...film.scenes.flatMap(item=>item.crops)]
    const images=[...new Set(crops.map(captureSource))].map(src=>{const image=new window.Image();image.src=src;return image})
    return()=>{observer.disconnect();media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility);images.forEach(image=>{image.onload=null})}
  },[film])

  useLayoutEffect(()=>{
    const element=root.current
    if(!element) return
    let disposed=false
    const build=()=>{
      animations.current.forEach(animation=>animation.cancel())
      const tracks:Animation[]=[]
      const animate=(target:Element,frames:Keyframe[],at:number,duration:number)=>{
        const animation=target.animate(frames,{delay:at,duration,fill:'both',easing:'linear'})
        animation.pause();animation.currentTime=clock.current;tracks.push(animation)
      }
      const enter='cubic-bezier(.22,1,.36,1)'
      const intro=element.querySelector<HTMLElement>('[data-intro]')
      if(intro)animate(intro,[{opacity:1},{opacity:0}],film.scenes[0].at-120,120)
      element.querySelectorAll<HTMLElement>('[data-message]').forEach((message,index)=>{
        animate(message,[{opacity:0,transform:'translateY(9px)',clipPath:'inset(0 0 100% 0)',easing:enter},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0% 0)'}],film.messages[index].at,280)
      })
      const scenes=element.querySelectorAll<HTMLElement>('[data-scene]')
      scenes.forEach((target,index)=>{
        const start=film.scenes[index].at,next=film.scenes[index+1]?.at
        const outgoingSameView=!!next&&film.scenes[index+1].layout===film.scenes[index].layout
        const end=next?next+(outgoingSameView?100:160):film.duration
        const sameView=index>0&&film.scenes[index-1].layout===film.scenes[index].layout
        const frames:Keyframe[]=[{opacity:0,transform:`translateY(${sameView?0:7}px)`,offset:0,easing:'cubic-bezier(.2,.8,.2,1)'},{opacity:1,transform:'translateY(0)',offset:(sameView?100:340)/(end-start)}]
        if(next) frames.push({opacity:1,transform:'translateY(0)',offset:(next-start)/(end-start)},{opacity:0,transform:'translateY(0)',offset:1})
        else frames.push({opacity:1,transform:'translateY(0)',offset:1})
        animate(target,frames,start,end-start)
      })
      element.querySelectorAll<HTMLElement>('[data-click]').forEach(pointer=>{
        animate(pointer,[{opacity:0,transform:'translate(9px,8px)',offset:0,easing:enter},{opacity:1,transform:'translate(0,0)',offset:.3},{opacity:1,transform:'translate(0,2px)',offset:.55},{opacity:0,transform:'translate(0,0)',offset:1}],Number(pointer.dataset.click),480)
      })
      element.querySelectorAll<HTMLElement>('[data-highlight]').forEach(outline=>{
        animate(outline,[{opacity:0,offset:0,easing:'ease-out'},{opacity:.65,offset:.18},{opacity:.65,offset:.65},{opacity:0,offset:1}],Number(outline.dataset.highlight),1300)
      })
      const chat=element.querySelector<HTMLElement>(`.${styles.chatStack}`)
      const viewport=element.querySelector<HTMLElement>(`.${styles.chatViewport}`)
      if(chat&&viewport){
        let previous=0
        const frames:Keyframe[]=[{transform:'translateY(0)',offset:0}]
        chat.querySelectorAll<HTMLElement>('[data-message]').forEach((message,index)=>{
          const shift=Math.max(0,message.offsetTop+message.offsetHeight-viewport.clientHeight+24)
          if(shift>previous){const at=film.messages[index].at;frames.push({transform:`translateY(-${previous}px)`,offset:at/film.duration,easing:'cubic-bezier(.4,0,.2,1)'},{transform:`translateY(-${shift}px)`,offset:(at+300)/film.duration});previous=shift}
        })
        frames.push({transform:`translateY(-${previous}px)`,offset:1})
        animate(chat,frames,0,film.duration)
      }
      animations.current=tracks
    }
    build()
    const observer=new ResizeObserver(()=>{if(!disposed)build()})
    observer.observe(element)
    seekRef.current=(time)=>{
      clock.current=Math.min(film.duration,Math.max(0,time))
      animations.current.forEach(animation=>{animation.currentTime=clock.current})
      setCurrent(sceneAt(film,clock.current));setFinished(clock.current>=film.duration)
    }
    return()=>{disposed=true;observer.disconnect();animations.current.forEach(animation=>animation.cancel());animations.current=[]}
  },[film])

  useEffect(()=>{
    if(reduced)seekRef.current(film.scenes[0].at+500)
  },[reduced,film])

  useEffect(()=>{
    if(!playing)return
    let frame=0,previous=performance.now(),announced=sceneAt(film,clock.current)
    const tick=(now:number)=>{
      clock.current=Math.min(film.duration,clock.current+Math.min(now-previous,100));previous=now
      animations.current.forEach(animation=>{animation.currentTime=clock.current})
      const next=sceneAt(film,clock.current)
      if(next!==announced){announced=next;setCurrent(next)}
      if(clock.current>=film.duration){setFinished(true);return}
      frame=requestAnimationFrame(tick)
    }
    frame=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(frame)
  },[playing,film])

  const replay=()=>{seekRef.current(reduced?film.scenes[0].at+500:0);setPaused(false)}
  const move=(direction:number)=>{setPaused(true);const next=Math.max(0,Math.min(film.scenes.length-1,current+direction));seekRef.current(film.scenes[next].at+500)}
  const enlarge=()=>{setExpanded(true);dialog.current?.showModal()}
  return <div className={styles.demo} ref={root} data-outcome={outcome} data-scene-index={current}>
    <div className={styles.topline}><span><i/>{t('THE COMPANION, AT WORK','EL COMPANION, EN ACCIÓN')}</span><div className={styles.controls}>
      {!reduced&&<button type="button" onClick={()=>finished?replay():setPaused(value=>!value)} aria-label={playing?t('Pause demonstration','Pausar demostración'):t('Play demonstration','Reproducir demostración')}>{playing?<Pause size={14}/>:<Play size={14}/>}</button>}
      <button type="button" onClick={replay} aria-label={t('Replay this demonstration','Repetir esta demostración')}><RotateCcw size={13}/><span>{t('Replay','Repetir')}</span></button>
      <button type="button" onClick={enlarge} aria-label={t('Inspect original app capture','Ver captura original de la app')}><Maximize2 size={14}/></button>
    </div></div>
    <div className={styles.film} aria-label={t('Edited actual-app demonstration','Demostración editada de la app real')}>
      <div className={styles.workspace}>
        <div className={styles.appBrand}><Crop crop={OUTCOME_CROPS.shared.brand}/></div>
        <div className={styles.workspaceBody}><div className={styles.intro} data-intro aria-hidden="true"><Crop crop={film.intro}/></div>{film.scenes.map((item,index)=><Scene key={index} scene={item} index={index} lang={lang} active={current===index}/>)}</div>
      </div>
      <div className={styles.chat}>
        <Crop crop={OUTCOME_CROPS.shared.chatHeader} className={styles.chatHeader}/>
        <div className={styles.chatViewport}><div className={styles.chatStack}>
          {film.messages.map((message,index)=><div key={index} data-message={index} className={`${styles.message} ${styles[message.side]}`} style={{width:`${message.crop.width/399*100}%`}}><Crop crop={message.crop}/><span className={styles.srOnly}>{message.side==='guest'?'Guest':'Companion'}: {message.text}</span></div>)}
        </div></div>
        <Crop crop={OUTCOME_CROPS.shared.composer} className={styles.composer}/>
        {scene.actor==='team'&&<div className={styles.archiveLabel}>{t('Guest conversation · same request','Conversación del huésped · misma solicitud')}</div>}
      </div>
    </div>
    <div className={styles.caption}><p aria-live="polite">{t(scene.en,scene.es)}</p><div className={styles.chapters} aria-label={t('Demonstration chapters','Capítulos de la demostración')}>{film.scenes.map((item,index)=><button type="button" key={index} aria-label={`${t('Show','Ver')}: ${t(item.en,item.es)}`} aria-current={index===current?'step':undefined} onClick={()=>{setPaused(true);seekRef.current(item.at+500)}}><span/></button>)}</div><div className={styles.controls}><button type="button" onClick={()=>move(-1)} disabled={current===0} aria-label={t('Previous chapter','Capítulo anterior')}><ArrowLeft size={14}/></button><button type="button" onClick={()=>move(1)} disabled={current===film.scenes.length-1} aria-label={t('Next chapter','Capítulo siguiente')}><ArrowRight size={14}/></button></div></div>
    <p className={styles.note}>{t('Product walkthrough · Casa Rosada','Recorrido del producto · Casa Rosada')}</p>
    <dialog ref={dialog} className={styles.dialog} aria-label={t('Original sales-demo capture','Captura original de la demo de ventas')} onClose={()=>setExpanded(false)}><header><p>{t(scene.en,scene.es)}</p><button type="button" onClick={()=>dialog.current?.close()} aria-label={t('Close original capture','Cerrar captura original')}><X size={20}/></button></header><div className={styles.expandedBody}><Image src={captureSource(scene)} alt={t(scene.en,scene.es)} width={1280} height={800} unoptimized className={styles.expandedImage}/></div></dialog>
  </div>
}
