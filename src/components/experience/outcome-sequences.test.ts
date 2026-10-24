import { describe, expect, it } from 'vitest'
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { CAPTURE_SIZE, OUTCOME_CROPS, type CaptureCrop } from './outcome-choreography'
import { captureSource, OUTCOME_FILMS, sceneAt } from './outcome-sequences'

const catalogCrops: CaptureCrop[] = Object.values(OUTCOME_CROPS).flatMap(group => Object.values(group))
const filmCrops = OUTCOME_FILMS.flatMap(film => [
  film.intro,
  ...film.messages.map(message => message.crop),
  ...film.scenes.flatMap(scene => scene.crops),
])

describe('authentic outcome films', () => {
  it('provides four short, nonempty demonstrations with both languages', () => {
    expect(OUTCOME_FILMS).toHaveLength(4)
    for (const film of OUTCOME_FILMS) {
      expect(film.duration).toBeGreaterThanOrEqual(10000)
      expect(film.duration).toBeLessThanOrEqual(16000)
      expect(film.messages.length).toBeGreaterThanOrEqual(2)
      expect(film.scenes.length).toBeGreaterThanOrEqual(2)
      expect(film.scenes.length).toBeLessThanOrEqual(6)
      for (const scene of film.scenes) {
        expect(scene.en.trim()).not.toBe('')
        expect(scene.es.trim()).not.toBe('')
        expect(scene.crops.length).toBeGreaterThan(0)
      }
    }
  })

  it('references available original captures for every crop and inspection view', () => {
    const captures = [
      ...catalogCrops,
      ...filmCrops,
      ...OUTCOME_FILMS.flatMap(film => film.scenes),
    ]
    for (const file of new Set(captures.map(capture => capture.file))) {
      expect(file).toMatch(/^(revenue|service|team|memory)-\d{2}$/)
      const path = join(process.cwd(), 'public', captureSource({ file }))
      expect(existsSync(path), `Missing source: ${file}`).toBe(true)
      expect(statSync(path).size, `Empty source: ${file}`).toBeGreaterThan(0)
    }
  })

  it('keeps every editorial crop within the unchanged source-image bounds', () => {
    for (const crop of [...catalogCrops, ...filmCrops]) {
      for (const value of [crop.x, crop.y, crop.width, crop.height]) {
        expect(Number.isInteger(value), `${crop.file}: non-integer crop`).toBe(true)
      }
      expect(crop.x).toBeGreaterThanOrEqual(0)
      expect(crop.y).toBeGreaterThanOrEqual(0)
      expect(crop.width).toBeGreaterThan(0)
      expect(crop.height).toBeGreaterThan(0)
      expect(crop.x + crop.width, `${crop.file}: horizontal crop bounds`).toBeLessThanOrEqual(CAPTURE_SIZE.width)
      expect(crop.y + crop.height, `${crop.file}: vertical crop bounds`).toBeLessThanOrEqual(CAPTURE_SIZE.height)
    }
  })

  it('starts visibly with the guest and sequences the real reply before its app result', () => {
    for (const film of OUTCOME_FILMS) {
      const firstMessage = film.messages[0]
      const firstReply = film.messages.find(message => message.side === 'companion')
      expect(firstMessage.side).toBe('guest')
      expect(firstMessage.at).toBeGreaterThanOrEqual(0)
      expect(firstMessage.at).toBeLessThanOrEqual(250)
      expect(firstReply).toBeDefined()
      expect(film.scenes[0].at).toBeGreaterThanOrEqual(firstReply!.at + 280)
      expect(film.scenes[0].at).toBeLessThanOrEqual(1800)

      film.messages.forEach((message, index) => {
        expect(message.text.trim()).not.toBe('')
        expect(message.at + 280).toBeLessThan(film.duration)
        if (index > 0) expect(message.at).toBeGreaterThan(film.messages[index - 1].at + 280)
      })
    }
  })

  it('gives each scene reading time and keeps click cues inside their source scene', () => {
    for (const film of OUTCOME_FILMS) {
      film.scenes.forEach((scene, index) => {
        const next = film.scenes[index + 1]?.at ?? film.duration
        expect(next - scene.at).toBeGreaterThanOrEqual(1800)
        if (!scene.click) return
        expect(scene.click.at).toBeGreaterThanOrEqual(scene.at + 340)
        expect(scene.click.at).toBeLessThan(next)
        expect(scene.click.at + 480).toBeLessThanOrEqual(next + 200)
        expect(Number.isInteger(scene.click.crop)).toBe(true)
        const targetCrop = scene.crops[scene.click.crop]
        expect(targetCrop).toBeDefined()
        expect(scene.click.x).toBeGreaterThanOrEqual(0)
        expect(scene.click.x).toBeLessThanOrEqual(targetCrop.width)
        expect(scene.click.y).toBeGreaterThanOrEqual(0)
        expect(scene.click.y).toBeLessThanOrEqual(targetCrop.height)
      })
    }
  })

  it('resolves scene boundaries consistently for playback, seeking and the final frame', () => {
    for (const film of OUTCOME_FILMS) {
      expect(sceneAt(film, -1)).toBe(0)
      expect(sceneAt(film, 0)).toBe(0)
      film.scenes.forEach((scene, index) => {
        expect(sceneAt(film, scene.at)).toBe(index)
        expect(sceneAt(film, scene.at + 500)).toBe(index)
        if (index > 0) expect(sceneAt(film, scene.at - 1)).toBe(index - 1)
      })
      expect(sceneAt(film, film.duration)).toBe(film.scenes.length - 1)
      expect(sceneAt(film, film.duration + 1000)).toBe(film.scenes.length - 1)
    }
  })

  it('marks actual staff actions and guest refresh rather than implying automatic fulfilment or a reset chat', () => {
    const teamFilm = OUTCOME_FILMS[2]
    const staffScenes = teamFilm.scenes.filter(scene => scene.actor === 'team')
    expect(staffScenes).toHaveLength(4)
    expect(staffScenes.map(scene => scene.file)).toEqual(['team-11', 'team-12', 'team-13', 'team-14'])
    expect(staffScenes[0].en).toContain('Engineering')
    expect(staffScenes.at(-1)?.crops[2]).toEqual(OUTCOME_CROPS.team.resolvedAudit)
    expect(teamFilm.scenes.at(-1)?.actor).toBe('guest-update')
    expect(teamFilm.scenes.at(-1)?.file).toBe('service-17')
    expect(teamFilm.scenes.at(-1)?.en).toContain('refreshes')
    const serviceFilm = OUTCOME_FILMS[1]
    expect(serviceFilm.scenes.filter(scene => scene.actor === 'guest-update').map(scene => scene.file))
      .toEqual(['service-16', 'service-17'])
    expect(serviceFilm.messages.at(-1)?.text).toContain('has not acknowledged it yet')
    expect(teamFilm.messages).toHaveLength(2)
    expect([...serviceFilm.scenes,...teamFilm.scenes].every(scene => !/reopen|reset/i.test(scene.en))).toBe(true)
    for (const crop of [...Object.values(OUTCOME_CROPS.service),...Object.values(OUTCOME_CROPS.team)]) {
      expect(Number(crop.file.split('-')[1])).toBeGreaterThanOrEqual(11)
    }
  })

  it('shows actual previous-visit recall followed by a guest-requested room detail, not My stay or automatic booking', () => {
    const memoryFilm = OUTCOME_FILMS[3]
    expect(memoryFilm.intro.file).toBe('memory-11')
    expect(memoryFilm.scenes.map(scene => scene.file)).toEqual(['memory-12', 'memory-13'])
    expect(memoryFilm.scenes.map(scene => scene.layout)).toEqual(['history', 'rooms'])
    expect(memoryFilm.messages.map(message => message.side)).toEqual(['guest', 'companion', 'guest', 'companion'])
    expect(memoryFilm.messages[0].text).toContain('previous stay')
    expect(memoryFilm.messages[1].text).toContain('Your visit included La Rosa tasting menu, Aromatherapy massage, Cooking class.')
    expect(memoryFilm.messages[2].text).toBe('Show me the same suite for my next visit.')
    expect(memoryFilm.scenes[1].at).toBeGreaterThanOrEqual(memoryFilm.messages[3].at + 280)
    expect(memoryFilm.scenes.at(-1)?.en).toBe('A familiar suite. The start of a new stay.')
    expect(memoryFilm.messages.at(-1)?.text).toContain('Shall I prepare your stay?')
    expect(memoryFilm.scenes.every(scene => !scene.click)).toBe(true)
  })

  it('uses the clean air-conditioning exchange and the actual Send request action', () => {
    const serviceFilm = OUTCOME_FILMS[1]
    const teamFilm = OUTCOME_FILMS[2]
    expect(serviceFilm.intro.file).toBe('service-11')
    expect(serviceFilm.scenes[0].file).toBe('service-12')
    expect(serviceFilm.scenes[1].file).toBe('service-13')
    expect(serviceFilm.scenes[1].en).toContain('presses Send request')
    expect(serviceFilm.scenes[0].click?.crop).toBe(1)
    expect(serviceFilm.scenes[0].crops[1]).toEqual(OUTCOME_CROPS.service.submitButton)
    expect(serviceFilm.messages[0].text).toBe('The air conditioning is not working in room 214.')
    expect(serviceFilm.messages[1].text).toBe("Your air conditioning request is ready for room 214. I've added your details. Shall I send it?")
    expect(serviceFilm.messages[2].text).toBe('Air conditioning: request received for 214. The team has not acknowledged it yet; you can follow its progress here.')
    expect(teamFilm.messages[0]).toMatchObject({crop:serviceFilm.messages[0].crop,text:serviceFilm.messages[0].text})
    expect(teamFilm.messages[1]).toMatchObject({crop:serviceFilm.messages[2].crop,text:serviceFilm.messages[2].text})
    for (const message of [...serviceFilm.messages, ...teamFilm.messages]) {
      expect(message.text).not.toMatch(/towels|demonstration request|no real team|demo approval/i)
    }
  })
})
