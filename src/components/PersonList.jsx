import { useMutation, useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { ALL_PERSONS, REMOVE_PERSON } from "../queries";

export const PersonList = ({ modal, setModal, setMethod, setInfo }) => {
	// usequery es un hook que nos permite hacer consultas a nuestro servidor GraphQL

	const { loading, error, data } = useQuery(ALL_PERSONS);
	// useMutation es un hook que nos permite hacer mutaciones a nuestro servidor GraphQL
	const [removePerson] = useMutation(REMOVE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});
	console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	const removeUser = (name) => {
		removePerson({ variables: { name } });
	};

	const editInfo = (person) => {
		setModal(!modal);
		setMethod("edit");
		setInfo(person);
	};

	const addNewPerson = () => {
		setModal(true);
		setMethod("add");
	};

	return (
		<div className="mx-auto max-w-2xl">
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">Phone</TableCell>
							<TableCell align="center">City</TableCell>
							<TableCell align="center">Edit</TableCell>
							<TableCell align="center">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.allPersons.map((person) => (
							<TableRow key={person.id}>
								<TableCell component="th" scope="row">
									{person.name}
								</TableCell>
								<TableCell align="right">
									{person.phone === null ? "No phone" : person.phone}
								</TableCell>
								<TableCell align="right">{person.address.city}</TableCell>
								<TableCell align="right">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										type="button"
										onClick={() => editInfo(person)}
									>
										Edit
									</button>
								</TableCell>
								<TableCell align="right">
									<button
										type="button"
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => removeUser(person.name)}
									>
										Delete
									</button>
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell>
								<button
									type="button"
									className="bg-slate-400 text-white font-bold py-2 px-4 rounded"
									onClick={() => addNewPerson()}
								>
									Add new person
								</button>
							</TableCell>
							<TableCell />
							<TableCell />
							<TableCell />
							<TableCell>
								<div className="w-18  h-8 flex justify-center items-center bg-orange-300 rounded-3xl">
									<p className="text-base text-slate-900">
										Total {data.personCount}
									</p>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
