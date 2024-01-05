// $('.date-here').text(today.format('MMM DD, YYYY [ at ] h:mm:ss a'));
const listGroup = $('.list-group');
const inputForm = $('#input-form');

function displayTime() {
    setInterval( function() {
        let currentTime = dayjs().format('MMM DD, YYYY [ at ] h:mm:ss a');
        $('.date-here').text(currentTime);
    }, 1000);
}
displayTime();

function createList() {
    var projectData = JSON.parse(localStorage.getItem('projectData') || '[]');
    console.log(projectData);



    projectData.forEach( function(dat, color) {
        
        const hourDiff = dayjs().diff(dat.dueDate, 'hour');
        // const dayDiff = Math.floor(hourDiff / 24);

        if (hourDiff > 0) {
            color = 'text-bg-warning';
        } else if (hourDiff < -24) {
            color = '';
        } else {
            color = 'text-bg-warning'
        }
        
        const newItem = $(`<li class="list-group-item${color}">${dat.projectName}, ${dat.projectType}, due on ${dat.dueDate}.</li>`);
        
    listGroup.append(newItem);
    });
}

createList();

inputForm.on('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    var projectData = JSON.parse(localStorage.getItem('projectData') || '[]');
    var projectNameVal = $('#project-name').val();
    var projectTypeVal = $('#project-type').val();
    var dueDateVal = $('#due-date').val();
    var currentProjectData = {
        projectName: projectNameVal,
        projectType: projectTypeVal,
        dueDate: dueDateVal,
    }
    projectData.push(currentProjectData);
    localStorage.setItem('projectData', JSON.stringify(projectData));

    const projectName = $('#project-name');
    const projectType = $('#project-type');
    const dueDate = $('#due-date');

    const newItem = $(`<li class="list-group-item">${projectName.val()}, ${projectType.val()}, due on ${dueDate.val()}.</li>`);

    console.log(dayjs().diff(dueDate.val(), 'hour'));

    listGroup.append(newItem);
    projectName.val('');
    projectType.val('');
    dueDate.val('');


}

// Color-coding
// on submit: get the date of deadline
// Check that date against current date
// Check if deadline is past, present or future
//  if it's in the past-> red
//  if it's future min 2 days -> white
//  if it's 'today' { check if it is truly today}