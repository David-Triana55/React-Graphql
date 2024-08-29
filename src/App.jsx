import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { PersonList } from "./components/PersonList";
import { UpdateUser } from "./components/UpdateUser";

function App() {
	const [modal, setModal] = useState(false);
	const [method, setMethod] = useState(null);
	const [info, setInfo] = useState(null);
	return (
		<div>
			<h1 className="text-3xl font-bold mb-5">Users</h1>
			<PersonList
				modal={modal}
				setModal={setModal}
				setMethod={setMethod}
				setInfo={setInfo}
			/>

			{modal && (
				<Modal>
					<UpdateUser method={method} info={info} setModal={setModal} />
				</Modal>
			)}
		</div>
	);
}

export default App;
