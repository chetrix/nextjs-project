import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../helpers/api-util";

export default function FilteredEventsPage(props) {
  const router = useRouter();

  //   const filterData = router.query.slug;
  //   if (!filterData) {
  //     return <p className="center">Loading...</p>;
  //   }

  //   const filteredYear = filterData[0];
  //   const filteredMonth = filterData[1];

  //   const numYear = +filteredYear;
  //   const numMonth = +filteredMonth;

  if (props.hasError) {
    return <p>Invalid filter!!</p>;
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the selected filter!</p>;
  }
  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
    },
  };
}
