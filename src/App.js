import React, { useState } from 'react'
import './style.css'

function App() {
	const [items, setItems] = useState([])
	const [text, setText] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		if (!text) return
		setItems([...items, { text, completed: false }])
		setText('')
	}

	function completeItem(index) {
		const newItems = [...items]
		newItems[index].completed = !newItems[index].completed
		setItems(newItems)
	}

	function deleteItem(index) {
		const newItems = [...items]
		newItems.splice(index, 1)
		setItems(newItems)
	}

	return (
		<div className='container'>
			<h1>To-Do List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder='Add new item...'
				/>
				<button type='submit'>Add</button>
			</form>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<label>
							<input
								type='checkbox'
								checked={item.completed}
								onChange={() => completeItem(index)}
							/>
							{item.text}
						</label>
						<span className='delete' onClick={() => deleteItem(index)}>
							&#x2715;
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
