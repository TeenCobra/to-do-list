const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const pendList = document.getElementById('pendList');
const doneList = document.getElementById('doneList');
const taskModal = document.getElementById('taskModal');
const pendTaskModal = document.getElementById('pendTaskModal');

let currentTaskItem; // To keep track of the current task item
let currentPendTaskItem; // To keep track of the current task item in Pend list

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const li = document.createElement('li');

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Add event listener to show modal when checkbox is checked
        checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            currentTaskItem = li; // Store the current task item
            taskModal.style.display = 'block'; // Show the modal
        } else {
            taskList.appendChild(li); // Move back to To-Do list if unchecked
        }
    });

   // Append task text and checkbox to the list item
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(taskText));

    // Append the list item to the task list
    taskList.appendChild(li);
    taskInput.value = ''; // Clear the input field
    }
    });

    // Handle the Pend button click
    document.getElementById('pendButton').addEventListener('click', function() {
        if (currentTaskItem) {
            // Move to Pend list
            pendList.appendChild(currentTaskItem); 
            const checkbox = currentTaskItem.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false; // Ensure the checkbox is unchecked
            }
            taskModal.style.display = 'none'; // Hide the modal
        }
    });

    // Handle the Done button click
    document.getElementById('doneButton').addEventListener('click', function() {
        doneList.appendChild(currentTaskItem); // Move to Done list
        taskModal.style.display = 'none'; // Hide the modal
    });

    // Handle the Cancel button click
    document.getElementById('closeModalButton').addEventListener('click', function() {
        taskModal.style.display = 'none'; // Hide the modal
        if (currentTaskItem) {
            const checkbox = currentTaskItem.querySelector('input[type="checkbox"]');
            checkbox.checked = false; // Uncheck the checkbox
        }
    });


    // Adding event listener for Pend list items
    pendList.addEventListener('click', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') { // Check if the clicked element is an <li>
            event.preventDefault();
            currentPendTaskItem = event.target.parentElement; // Store the current task item
            const checkbox = event.target;
            if (checkbox) {
                checkbox.checked = true; // Check the checkbox
            }
            pendTaskModal.style.display = 'block'; // Show the modal
            checkbox.checked = false;
        }
    });

    // Handle the To-do button click in Pend modal
    document.getElementById('toDoButton').addEventListener('click', function() {
        if (currentPendTaskItem) {
            taskList.appendChild(currentPendTaskItem); // Move to To-do list
            const checkbox = currentPendTaskItem.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false; // Uncheck the checkbox
            }
            pendTaskModal.style.display = 'none'; // Hide the modal
        }
    });

    // Handle the Done button click in Pend modal
    document.getElementById('doneButtonPend').addEventListener('click', function() {
        if (currentPendTaskItem) {
            doneList.appendChild(currentPendTaskItem); // Move to Done list
            const checkbox = currentPendTaskItem.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = true; // Check the checkbox
            }
            pendTaskModal.style.display = 'none'; // Hide the modal
        }
    });

    // Handle the Cancel button click in Pend modal
    document.getElementById('closePendModalButton').addEventListener('click', function() {
        pendTaskModal.style.display = 'none'; // Hide the modal
        if (currentPendTaskItem) {
            const checkbox = currentPendTaskItem.querySelector('input[type="checkbox"]');
            checkbox.checked = false; // Uncheck the checkbox
        }
    });

