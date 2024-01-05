// $('.date-here').text(today.format('MMM DD, YYYY [ at ] h:mm:ss a'));

function displayTime() {
    setInterval( function() {
        let currentTime = dayjs().format('MMM DD, YYYY [ at ] h:mm:ss a');
        $('.date-here').text(currentTime);
    }, 1000);
}
displayTime();



const listGroup = $('.list-group');
const inputForm = $('#input-form');
inputForm.on('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const projectName = $('#project-name');
    const projectType = $('#project-type');
    const dueDate = $('#due-date');

    console.log(`project name: ${projectName.val()}`);
    console.log(`project type: ${projectType.val()}`);
    console.log(`due date: ${dueDate.val()}`);

    const newItem = $(`<li class="list-group-item">${projectName.val()}, ${projectType.val()}, due on ${dueDate.val()}.</li>`);

    listGroup.append(newItem);
    projectName.val('');
    projectType.val('');
    dueDate.val('');
}

