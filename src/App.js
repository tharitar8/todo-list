import React, { useState, useEffect } from 'react'

import './style.css'

function App() {
	// use an array because it's a list of items
	const [items, setItems] = useState([])
	// this one is a string because we want to represent a piece of text that the user types into the input field
	const [text, setText] = useState('')
	const [editIndex, setEditIndex] = useState(-1)

	function handleSubmit(e) {
		e.preventDefault()

		if (editIndex !== -1) {
			const newItems = [...items]
			newItems[editIndex].text = text
			setItems(newItems)
			localStorage.setItem('items', JSON.stringify(newItems))
			setText('')
			setEditIndex(-1)
		} else {
			if (!text) return
			const newItems = [...items, { text, completed: false }]
			setItems(newItems)
			localStorage.setItem('items', JSON.stringify(newItems))
			setText('')
		}
	}

	// COMPLETE
	function completeItem(index) {
		// const newItems = [...items]: This creates a new array of items by spreading the existing items array.
		const newItems = [...items]
		// This toggles the completed property of the item at the specified index.
		newItems[index].completed = !newItems[index].completed
		// This updates the items state variable with the new array of items.
		setItems(newItems)
		// This saves the new array of items to local storage, converting it to a JSON
		localStorage.setItem('items', JSON.stringify(newItems))
	}
	// DELETE
	function deleteItem(index) {
		const newItems = [...items]
		// splice(): This is a method that is used to add or remove elements from an array. In this case, we are using it to remove the item at the specified index and removing only 1 element.
		newItems.splice(index, 1)
		setItems(newItems)
		localStorage.setItem('items', JSON.stringify(newItems))
	}
	// 	EDIT
	function editItem(index) {
		setText(items[index].text)
		setEditIndex(index)
	}

	useEffect(() => {
		const storedItems = JSON.parse(localStorage.getItem('items'))
		if (storedItems) {
			setItems(storedItems)
		}
	}, [])

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
				<button type='submit'>{editIndex !== -1 ? 'Update' : 'Add'}</button>
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
							{editIndex === index ? (
								<input
									type='text'
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
							) : (
								<span onClick={() => editItem(index)}>{item.text}</span>
							)}
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
