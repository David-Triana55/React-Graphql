import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { ALL_PERSONS, CREATE_PERSON, UPDATE_PERSON } from "../queries";

export function UpdateUser({ method, info, setModal }) {
	const [data, setData] = useState({
		id: info?.id,
		name: info?.name,
		phone: info?.phone ?? "",
		street: info?.address.street,
		city: info?.address.city,
	});

	const [updatePerson] = useMutation(UPDATE_PERSON);

	const [createPerson] = useMutation(CREATE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});

	const updateUser = (e) => {
		e.preventDefault();
		console.log(data);
		if (data.phone === "") return;
		if (data.street === "") return;
		if (data.city === "") return;
		updatePerson({
			variables: {
				name: data.name,
				phone: data.phone,
				street: data.street,
				city: data.city,
			},
		});
		setModal(false);
	};

	const createUser = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		createPerson({
			variables: {
				name: formData.get("name"),
				phone: formData.get("phone"),
				street: formData.get("street"),
				city: formData.get("city"),
			},
		});
		setTimeout(() => {}, 1000);
		setModal(false);
	};

	if (method === "edit") {
		return (
			<div className="flex w-full h-full col flex-col items-center justify-center  gap-2 z-30">
				<form
					onSubmit={updateUser}
					className="flex flex-col min-w-96 shadow-2xl p-8 gap-2 rounded-3xl bg-slate-100 border-2 border-slate-300"
				>
					<h1 className="text-xl mb-8 text-center">Update User</h1>
					<TextField label="Name" value={data.name} type="text" disabled />
					<TextField
						required
						label="Phone"
						placeholder={info.phone}
						value={data.phone}
						type="text"
						onChange={(e) => setData({ ...data, phone: e.target.value })}
					/>
					<TextField
						label="Street"
						value={data.street}
						placeholder={info.address.street}
						type="text"
						required
						onChange={(e) => setData({ ...data, street: e.target.value })}
					/>
					<TextField
						label="City"
						placeholder={info.address.city}
						value={data.city}
						type="text"
						required
						onChange={(e) => setData({ ...data, city: e.target.value })}
					/>
					<Button variant="contained" type="submit">
						Update
					</Button>
					<Button
						variant="outlined"
						color="error"
						onClick={() => setModal(false)}
					>
						Cancel
					</Button>
				</form>
			</div>
		);
	}

	if (method === "add") {
		return (
			<div className="flex w-full h-full col flex-col items-center justify-center rounded-sm gap-2">
				<form
					onSubmit={createUser}
					className="flex flex-col min-w-96 shadow-2xl p-8 gap-2 rounded-3xl bg-slate-100 border-2 border-slate-300"
				>
					<h1 className="text-xl mb-8 text-center">Create User</h1>
					<TextField
						label="Name"
						name="name"
						placeholder="name"
						type="text"
						required
					/>
					<TextField
						required
						label="Phone"
						name="phone"
						placeholder="phone"
						type="text"
					/>
					<TextField
						label="Street"
						placeholder="street"
						name="street"
						type="text"
						required
					/>
					<TextField
						label="City"
						name="city"
						placeholder="city"
						type="text"
						required
					/>
					<Button variant="contained" type="submit">
						Update
					</Button>
					<Button
						variant="outlined"
						color="error"
						onClick={() => setModal(false)}
					>
						Cancel
					</Button>
				</form>
			</div>
		);
	}
}
