
import { api } from "@knowingly/backend/convex/_generated/api";
import { fetchAction } from "convex/nextjs";
import { HostFilter } from "./host-filter";
import { DateFilter } from "./date-filter";
import { Separator } from "@knowingly/ui/separator";
import { cn } from "@knowingly/ui";
import { CountriesChart } from "~/components/charts/countries-chart";
import { PagevisitsChart } from "~/components/charts/page-visits-chart";
import { DevicesChart } from "~/components/charts/devices-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@knowingly/ui/card";

export default async function KnowinglyAdminAnalyticsPage({searchParams} : {searchParams: any}) {
  const {host, startDate, endDate} = searchParams;
  const analytics = await fetchAction(api.analytics.get, {hostname: host, date_range: (startDate && endDate) ? [startDate, endDate] : "30d"});



  return (
    <div className="flex w-full flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Analytics
          </h1>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center w-full justify-between ">
            <div className="flex items-center gap-1 font-medium text-sm">

            <HostFilter initialHost={searchParams.host}/>
            <Separator orientation="vertical" decorative  className="bg-red-500 text-red-500 border-red-500" /> 
            <span className={cn("size-2 rounded-full  border", analytics.online > 0 ? "bg-green-500" : "bg-transparent")} ></span>
            {analytics.online}{" "}
            Current Visitors
            </div>

            <DateFilter />
          </div>
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Unique Visitors</CardTitle>
                <CardDescription>Number of unique visitors in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{analytics.metrics.visitors}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Visits</CardTitle>
                <CardDescription>Number of total visits in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{analytics.metrics.visits}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Pageviews</CardTitle>
                <CardDescription>Number of total pageviews in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{analytics.metrics.pageviews}</p>
              </CardContent>
            </Card>
          </div>
            <div className="grid grid-cols-2 gap-2">

            <CountriesChart data={analytics.dimensions["visit:country"]} />
            <PagevisitsChart data={analytics.dimensions["event:page"]} />
            <DevicesChart data={analytics.dimensions["visit:device"]} />
            </div>
            </>


          
          
        </div>
      </div>
    </div>
  );
}
