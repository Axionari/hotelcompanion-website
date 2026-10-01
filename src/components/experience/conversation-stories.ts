/** Illustrative exchanges, not live bookings or operational records. */
export type ConversationKind = 'capability' | 'gallery' | 'channel' | 'recovery'
type Exchange = { en: readonly string[]; es: readonly string[]; outcome: readonly [string, string] }
const anniversary: Exchange = {
 en: ["It’s our anniversary. Any ideas for tonight?", "A terrace dinner with wine for two is $120. Would you like a quiet table?", "Yes, at 8 please. One of us is vegetarian.", "Confirmed for 8pm, with a vegetarian menu. Dinner and wine: $120 for two."],
 es: ["Es nuestro aniversario. ¿Ideas para esta noche?", "Cena en la terraza con vino para dos: $120. ¿Les gustaría una mesa tranquila?", "Sí, a las 8. Uno de nosotros es vegetariano.", "Confirmado a las 8pm, con menú vegetariano. Cena y vino: $120 para dos."],
 outcome: ['Dinner + wine booked', 'Cena + vino reservados'],
}
const balcony: Exchange = {
 en: ["I’d love a balcony for morning coffee.", "The Garden Suite has a private balcony. The upgrade is $80 per night for your two-night stay.", "Lovely. Let’s upgrade.", "Your upgrade is confirmed: two nights, $160 total. Enjoy your morning coffee."],
 es: ["Me gustaría un balcón para el café de la mañana.", "La Suite Jardín tiene balcón privado. La mejora cuesta $80 por noche para tus dos noches.", "Perfecto. Quiero la mejora.", "Tu mejora está confirmada: dos noches, $160 en total. Disfruta tu café de la mañana."],
 outcome: ['Room upgrade confirmed', 'Mejora de habitación confirmada'],
}
const spa: Exchange = {
 en: ["The full spa day won’t work. We only have an hour.", "A 45-minute massage fits. There’s a 4pm appointment for $65 per person.", "Perfect. Book it for both of us.", "Two massages confirmed for 4pm. Total: $130. You’ll be finished before dinner."],
 es: ["El día completo de spa no nos sirve. Solo tenemos una hora.", "Un masaje de 45 minutos encaja. Hay horario a las 4pm por $65 por persona.", "Perfecto. Resérvalo para los dos.", "Dos masajes confirmados a las 4pm. Total: $130. Terminan antes de la cena."],
 outcome: ['A shorter treatment. Two bookings.', 'Un tratamiento más corto. Dos reservas.'],
}
const memory: Exchange = {
 en: ["We’re back. Where should we eat tonight?", "Welcome back. You saved a preference for quiet evenings. How about the courtyard at 8?", "Yes, we loved it last time.", "Your courtyard table is confirmed for 8pm. I’ve passed along your quiet-table preference."],
 es: ["Volvimos. ¿Dónde cenamos esta noche?", "Bienvenidos de nuevo. Guardaron su preferencia por noches tranquilas. ¿El patio a las 8?", "Sí, nos encantó la última vez.", "Su mesa en el patio está confirmada a las 8pm. Compartí su preferencia por una mesa tranquila."],
 outcome: ['Remembered preference. Personal service.', 'Preferencia recordada. Servicio personal.'],
}
const towels: Exchange = {
 en: ["Could we get two extra towels?", "Of course. Which room are you in?", "Room 204, please.", "Housekeeping has accepted your request. Two towels are on their way to room 204."],
 es: ["¿Nos pueden traer dos toallas extra?", "Claro. ¿En qué habitación están?", "Habitación 204, por favor.", "Limpieza aceptó su solicitud. Dos toallas van en camino a la habitación 204."],
 outcome: ['Request accepted by housekeeping', 'Solicitud aceptada por limpieza'],
}
const explore: Exchange = {
 en: ["What can we do at the hotel tonight?", "Dinner on the terrace or a relaxing spa treatment. What sounds more like your evening?", "Dinner, somewhere quiet.", "The courtyard has a table for two at 8pm. Shall I reserve it for you?"],
 es: ["¿Qué podemos hacer en el hotel esta noche?", "Cena en la terraza o un tratamiento de spa. ¿Qué les apetece más?", "Cena, en un lugar tranquilo.", "El patio tiene una mesa para dos a las 8pm. ¿Se las reservo?"],
 outcome: ['A conversation becomes a relevant offer', 'Una conversación se convierte en oferta relevante'],
}
const roomService: Exchange = {
 en: ["Can we have dinner in the room?", "Of course. Our mushroom risotto is $24. Would you like two, or a different dish?", "Two risottos, please. Room 204.", "Your order is confirmed: two risottos to room 204, $48 total. The kitchen is preparing them."],
 es: ["¿Podemos cenar en la habitación?", "Claro. El risotto de hongos cuesta $24. ¿Quieren dos u otro platillo?", "Dos risottos, por favor. Habitación 204.", "Pedido confirmado: dos risottos a la habitación 204, $48 en total. La cocina los está preparando."],
 outcome: ['Room service ordered', 'Servicio a la habitación confirmado'],
}
const simplerDinner: Exchange = {
 en: ["The tasting menu is more than we want to spend.", "You can dine à la carte instead, with mains from $24. Same restaurant, a simpler evening.", "That works. A table for two at 8?", "Confirmed for 8pm. You’ll choose and pay for your dishes at the restaurant."],
 es: ["El menú degustación supera nuestro presupuesto.", "Pueden cenar a la carta, con platos desde $24. Mismo restaurante, una noche más sencilla.", "Eso nos sirve. ¿Una mesa para dos a las 8?", "Confirmado a las 8pm. Eligen y pagan sus platos en el restaurante."],
 outcome: ['An alternative keeps the dinner booking', 'Una alternativa conserva la reserva'],
}
const laterDinner: Exchange = {
 en: ["Is there a table for two at 8?", "8pm is full, but there’s a courtyard table at 8:30. Would that work?", "Yes, 8:30 is fine.", "Your courtyard table for two is confirmed for 8:30pm. See you this evening."],
 es: ["¿Hay una mesa para dos a las 8?", "A las 8 está lleno, pero hay mesa en el patio a las 8:30. ¿Les sirve?", "Sí, a las 8:30 está bien.", "Su mesa para dos en el patio está confirmada a las 8:30pm. Los esperamos esta noche."],
 outcome: ['A new time. A booking saved.', 'Otro horario. Una reserva recuperada.'],
}
const collections: Record<ConversationKind, readonly Exchange[]> = {
 capability: [anniversary, memory, spa, towels],
 gallery: [explore, balcony, anniversary, spa, memory],
 channel: [anniversary, balcony, towels, roomService],
 recovery: [balcony, spa, simplerDinner, laterDinner],
}
export function conversationStory(kind: ConversationKind, index: number, lang: string) {
 const story = collections[kind][index]
 return { messages: lang === 'es' ? story.es : story.en, outcome: story.outcome[lang === 'es' ? 1 : 0] }
}
