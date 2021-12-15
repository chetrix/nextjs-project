import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from 'next/head';

export default function HomePage(props){

    return (
        <div>
            <Head>
                <title>NextJs</title>
                <meta name="description" content="Find a great eevnts that allow you to evolve..."/>
            </Head>
            <EventList items={props.events}/>
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}