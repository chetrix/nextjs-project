export async function getAllEvents() {
  const response = await fetch(
    "https://pwapwa-9901f-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allevents = await getAllEvents();
  return allevents.filter((event) => event.isFeatured);
}
export async function getEventById(id) {
  const allevents = await getAllEvents();
  return allevents.find((event) => event.id === id);
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allevents = await getAllEvents();

  let filteredEvents = allevents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}