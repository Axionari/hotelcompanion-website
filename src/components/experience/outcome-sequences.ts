import { OUTCOME_CROPS as C, type CaptureCrop } from './outcome-choreography'

export type FilmMessage = { crop: CaptureCrop; at: number; side: 'guest' | 'companion'; text: string }
export type FilmScene = {
  at: number; file: string; en: string; es: string
  layout: 'rooms' | 'review' | 'form' | 'record' | 'request' | 'team' | 'stay' | 'confirmation' | 'history'
  crops: readonly CaptureCrop[]
  actor?: 'team' | 'guest-update'
  click?: { at: number; crop: number; x: number; y: number }
}
export type OutcomeFilm = { duration: number; intro: CaptureCrop; messages: readonly FilmMessage[]; scenes: readonly FilmScene[] }
const crop = (file: string, x: number, y: number, width: number, height: number): CaptureCrop => ({file,x,y,width,height})

// Editorial cuts of the source app. No product UI or dialogue is generated.
// Times are presentation pacing, never a promise of response/fulfilment latency.
export const OUTCOME_FILMS: readonly OutcomeFilm[] = [
  {
    duration: 14600,
    intro: C.revenue.home,
    messages: [
      { crop:C.revenue.request, at:120, side:'guest', text:'I would like a suite with a private terrace for two guests.' },
      { crop:C.revenue.recommendation, at:1200, side:'companion', text:"For two guests with a private terrace, the Parroquia Suite is a lovely fit: thirty-eight square meters with direct views of La Parroquia, a stone tub, and its own terrace. If you’d like something larger still, the Gran Suite Rosada adds a sitting room and a bigger terrace. Would you like to see the Parroquia Suite in detail?" },
      { crop:C.revenue.chooseSuite, at:5700, side:'guest', text:'Yes, show me the Parroquia Suite.' },
      { crop:C.revenue.suiteReply, at:6600, side:'companion', text:'Parroquia Suite gives you direct la parroquia views, stone tub, private terrace. It is MX$7,200 per night. Shall I prepare your stay?' },
      { crop:C.revenue.datesRequest, at:9400, side:'guest', text:'Yes, November 6 to November 9, 2026, for two adults.' },
      { crop:C.revenue.datesReply, at:10500, side:'companion', text:"I’ll prepare your reservation, without confirming it yet. Whose name should the stay be under?" },
    ],
    scenes: [
      {at:1550,file:'revenue-03',en:'A relevant room. A reason to choose it.',es:'Una habitación relevante. Una razón para elegirla.',layout:'rooms',crops:[crop('revenue-03',51,263,742,455)]},
      {at:6950,file:'revenue-05',en:'The guest chooses. The suite opens.',es:'El huésped elige. La suite se abre.',layout:'rooms',crops:[crop('revenue-05',51,197,743,521)]},
      {at:10850,file:'revenue-07',en:'Dates and guests shape the reservation.',es:'Fechas y huéspedes dan forma a la reserva.',layout:'review',crops:[C.revenue.reviewRoom,C.revenue.populatedDates]},
    ],
  },
  {
    duration:13200,
    intro: crop('service-11',0,86,845,632),
    messages:[
      {crop:C.service.request,at:120,side:'guest',text:'The air conditioning is not working in room 214.'},
      {crop:C.service.checkRequest,at:1100,side:'companion',text:"Your air conditioning request is ready for room 214. I've added your details. Shall I send it?"},
      {crop:C.service.recordedReply,at:4700,side:'companion',text:'Air conditioning: request received for 214. The team has not acknowledged it yet; you can follow its progress here.'},
    ],
    scenes:[
      {at:1450,file:'service-12',en:'The request becomes a populated form.',es:'La solicitud se convierte en un formulario completo.',layout:'form',crops:[C.service.fields,C.service.submitButton],click:{at:3950,crop:1,x:420,y:22}},
      {at:4350,file:'service-13',en:'The guest presses Send request. It is received.',es:'El huésped pulsa Enviar solicitud. Queda recibida.',layout:'record',crops:[C.service.receivedCard]},
      {at:7800,file:'service-16',en:'After staff starts work, the refreshed request details show progress.',es:'Al iniciar la atención, los detalles actualizados muestran el avance.',layout:'request',crops:[C.service.inProgressDetail],actor:'guest-update'},
      {at:10400,file:'service-17',en:'Resolved—after the team records completion.',es:'Resuelta, después de que el equipo registra la resolución.',layout:'request',crops:[C.service.resolvedDetail],actor:'guest-update'},
    ],
  },
  {
    duration:15900,
    intro: C.service.receivedWorkspace,
    messages:[
      {crop:C.service.request,at:120,side:'guest',text:'The air conditioning is not working in room 214.'},
      {crop:C.service.recordedReply,at:1000,side:'companion',text:'Air conditioning: request received for 214. The team has not acknowledged it yet; you can follow its progress here.'},
    ],
    scenes:[
      {at:1350,file:'service-13',en:'A received request, with the guest’s context.',es:'Una solicitud recibida, con el contexto del huésped.',layout:'record',crops:[C.service.receivedCard]},
      {at:3350,file:'team-11',en:'The same request reaches Engineering.',es:'La misma solicitud llega a Mantenimiento.',layout:'team',crops:[C.team.newTask,C.team.newActions,C.team.newAudit],actor:'team',click:{at:5250,crop:1,x:52,y:52}},
      {at:5650,file:'team-12',en:'A staff acknowledgement enters the audit trail.',es:'La aceptación del equipo queda en el historial.',layout:'team',crops:[C.team.acknowledgedTask,C.team.acknowledgedActions,C.team.acknowledgedAudit],actor:'team',click:{at:7650,crop:1,x:160,y:52}},
      {at:8050,file:'team-13',en:'Work starts. The recorded history moves forward.',es:'La atención comienza. El historial avanza.',layout:'team',crops:[C.team.inProgressTask,C.team.inProgressActions,C.team.inProgressAudit],actor:'team',click:{at:10350,crop:1,x:54,y:102}},
      {at:10750,file:'team-14',en:'The team records resolution on the same service record.',es:'El equipo registra la resolución en la misma solicitud.',layout:'team',crops:[C.team.resolvedTask,C.team.resolvedActions,C.team.resolvedAudit],actor:'team'},
      {at:13000,file:'service-17',en:'The guest refreshes the request and sees the recorded resolution.',es:'El huésped actualiza la solicitud y ve la resolución registrada.',layout:'request',crops:[C.service.resolvedDetail],actor:'guest-update'},
    ],
  },
  {
    duration:13200,
    intro: C.memory.home,
    messages:[
      {crop:C.memory.request,at:120,side:'guest',text:'I am coming back. What did I enjoy on my previous stay?'},
      {crop:C.memory.reply,at:1100,side:'companion',text:'Welcome back. Last time you stayed in Parroquia Suite. Your visit included La Rosa tasting menu, Aromatherapy massage, Cooking class. You shared a preference for a private terrace, unhurried dining, gentle massage pressure. Would you like to start with the same suite for your next visit?'},
      {crop:C.memory.sameSuiteRequest,at:7700,side:'guest',text:'Show me the same suite for my next visit.'},
      {crop:C.memory.sameSuiteReply,at:8600,side:'companion',text:'Parroquia Suite gives you direct la parroquia views, stone tub, private terrace. It is MX$7,200 per night. Shall I prepare your stay?'},
    ],
    scenes:[
      {at:1450,file:'memory-12',en:'A previous visit returns: the suite, experiences and shared preferences.',es:'Se recuerda la visita anterior: suite, experiencias y preferencias compartidas.',layout:'history',crops:[C.memory.previousVisit]},
      {at:8950,file:'memory-13',en:'A familiar suite. The start of a new stay.',es:'Una suite familiar. El inicio de una nueva estancia.',layout:'rooms',crops:[C.memory.previousSuite]},
    ],
  },
]

export const captureSource = (capture: {file:string}) => `/assets/experience/chat-outcomes/${capture.file}.webp`
export function sceneAt(film: OutcomeFilm, time: number) {
  let index=0
  film.scenes.forEach((scene,i)=>{if(time>=scene.at)index=i})
  return index
}
