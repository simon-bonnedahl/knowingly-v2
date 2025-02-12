import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";

import { Textarea } from "@knowingly/ui/textarea";

import { useRouter, useSearchParams } from "next/navigation";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import type { Ent } from "@knowingly/backend/convex/types";
import { LoadingDots } from "../loaders";
import { Icons } from "@knowingly/icons";

interface Guest  {
	email: string;
};

interface FormPanelProps  {
	creator: Ent<"users">;
};


export function FormPanel({ creator }: FormPanelProps) {
	const user = useQuery(api.users.getMe);
	const router = useRouter();

	const [guests, setGuests] = React.useState<Guest[]>([]);
	const [loading, setLoading] = React.useState(false);
	const searchParams = useSearchParams();
	const slotParam = searchParams.get("slot");
	const createMeeting = useMutation(api.meetings.create);

	const addGuest = () => {
		setGuests([...guests, { email: "" }]);
	};

	const removeGuest = (index: number) => {
		setGuests(guests.filter((_, i) => i !== index));
	};

	const handleChange = (index: number, email: string) => {
		setGuests(guests.map((guest, i) => (i === index ? { email } : guest)));
	};

	const hasGuests = guests.length > 0;

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {
			notes: (e.currentTarget.elements.namedItem("notes") as HTMLInputElement).value,
			guests: guests.map((guest) => guest.email),
		};
	

		setLoading(true);
		await createMeeting({
			title: "Meeting with " + creator.name,
			length: 30 * 60 * 1000, // 30 minutes
			userId: creator._id,
			isPublic: false,
			notes: data.notes,
			startsAt: new Date(slotParam!).getTime(),
		});
		setLoading(false);
		router.push("/meetings");
	}


	return (
		<form className="flex flex-col gap-5 w-[360px]" onSubmit={onSubmit}>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="name">Your name</Label>
				<Input id="name" defaultValue={user?.name} disabled={!!user}/>
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="email">Email address</Label>
				<Input id="email" type="email" defaultValue={user?.email} disabled={!!user} />
			</div>
			{/* <div className="flex flex-col space-y-1.5">
				<Label htmlFor="phone">Phone number *</Label>
				<PhoneInput id="phone" />
			</div> */}
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="email">Additional notes</Label>
				<Textarea
					id="notes"
					placeholder="Please share anything that will help prepare for our meeting"
				/>
			</div>
			{hasGuests && (
				<>
					<Label htmlFor="email">Add guests</Label>
					<div className="flex flex-col gap-1">
						{guests.map((guest, index) => (
							<div key={index} className="flex items-center space-x-2 relative">
								<Input
									id="guest"
									type="email"
									placeholder="Email"
									value={guest.email}
									onChange={(e) => handleChange(index, e.target.value)}
								/>
								{/* <Tooltip>
									<TooltipTrigger asChild>
										<X
											className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 size-4"
											onClick={() => removeGuest(index)}
										/>
									</TooltipTrigger>
									<TooltipContent>Remove email</TooltipContent>
								</Tooltip> */}
							</div>
						))}
					</div>
				</>
			)}
			<Button
				type="button"
				variant="ghost"
				onClick={() => addGuest()}
				className="w-fit"
			>
				<Icons.usersPlus className="mr-2 size-4" />
				Add guests
			</Button>
			<div className="flex justify-end gap-2">
				<Button
					variant="ghost"
					onClick={() => {
						router.back();
					}}
				>
					Back
				</Button>
				<Button  type="submit" disabled={loading} >
					{loading ? <LoadingDots color="#fff"/> : "Request"}
				</Button>
			</div>
		</form>
	);
}
