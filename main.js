document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
let strikeText = ''; // global variable to assign strike-through format
let issueCountOpen = 0;   // global variable to count open issues

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id); // Correction: from === to ==
  currentIssue.status = 'Closed';

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id ) // Correction: inserted issue => and from !== to !=
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues(); // Inserted the whole line
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  const issueCount = document.getElementById('issueCount'); // Inserted the whole line
  issuesList.innerHTML = '';
  issueCount.innerHTML = ''; // This too
  issueCountOpen = 0; // This too

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    strikeText = ""; // This too
    if(status=='Open'){issueCountOpen++;} // This too
    else{strikeText = `style='text-decoration: line-through'`;} // This too

    issuesList.innerHTML +=  `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 ${strikeText}> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`; // Inserted ${strikeText} and corrected to closeIssue
  }

  issueCount.innerHTML = 'Total Open Issues = ' + issueCountOpen + " of " + issues.length; // Updating in the H2
  //issuesList.innerHTML = '';

}
