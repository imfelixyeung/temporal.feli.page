import { createFileRoute } from "@tanstack/react-router";
import Clock from "@/components/Clock";

export const Route = createFileRoute("/")({
    component: HomePage,
    loader: async () => ({
        date: new Date(),
    }),
});

function HomePage() {
    const { date } = Route.useLoaderData();
    return (
        <div className="container mx-auto my-16">
            <h1 className="font-bold text-2xl">The current time is</h1>
            <Clock initialDate={date} />
        </div>
    );
}
