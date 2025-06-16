import { Header, StatsCard, TripCards } from "components";
import { redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { allTrips, dashboardStatus, user } from "~/constants";

import type { Route } from "./+types/dashboard";
export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) {
      return redirect("/sign-in");
    }

    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Hatolik Dashboard da", error);

    return redirect("/sign-in");
  }
}

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const { totalUsers, usersJoined, totalTrips, userRole } = dashboardStatus;

  const user = loaderData as User | null;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user.name ?? "Guest"} `}
        des={`Assalomu aleylum`}
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel explicabo
        quidem fugiat modi dicta repellat optio, magni commodi praesentium ad
        ducimus sunt quibusdam excepturi delectus officiis tempora! Accusamus
        accusantium pariatur quisquam deleniti quod corporis est aliquid fugit,
        minima autem eum, veniam totam mollitia ducimus ipsum quae obcaecati.
        Quod id explicabo consequatur iure minus qui minima odit adipisci quasi
        odio recusandae, expedita sint perferendis nobis laborum nam sed
        necessitatibus, quos maiores laboriosam maxime? Fugiat rem vero
        obcaecati sint natus earum voluptates quos, suscipit adipisci sed cum
        ipsum error aspernatur ex ullam repudiandae necessitatibus voluptate
        iste repellat rerum qui assumenda! Voluptatem, mollitia.
      </p>

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStatus.TotalTrips}
            currentMonthCount={totalTrips.currentMonth}
            lastMonthCount={totalTrips.lastMonth}
          />

          <StatsCard
            headerTitle="Total Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>

      {/* <TripCards /> */}
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Create Trips</h1>

        <div className="trip-grid">
          {allTrips.slice(0, 4).map((trp) => (
            <TripCards
              key={trp.id}
              id={trp.id.toString()}
              image={trp.imageUrls[0]}
              location={trp.itinerary?.[0].location ?? ""}
              tags={trp.tags}
              price={trp.estimatedPrice}
              name={trp.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
