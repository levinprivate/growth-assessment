// Declare chart variable outside the function
let chart;

// Define levers and questions per lever outside the function
const levers = [
  { name: 'Lever 1: Insights-Driven Content', questions: 3, totalScore: 15 },
  { name: 'Lever 2: Goodwill Content Creation', questions: 3, totalScore: 15 },
  { name: 'Lever 3: Signature Content', questions: 3, totalScore: 15 },
  { name: 'Lever 4: Goodwill Content Offers', questions: 3, totalScore: 15 },
  { name: 'Lever 5: Sales Funnel Design & Optimization', questions: 1, totalScore: 5 },
  { name: 'Lever 6: Automation & Data Quality', questions: 1, totalScore: 5 },
  { name: 'Lever 7: B2B Growth Flywheel', questions: 1, totalScore: 5 },
  { name: 'Lever 8: B2B Creative Campaigns', questions: 3, totalScore: 15 },
  { name: 'Lever 9: Data Analytics & Reporting', questions: 1, totalScore: 5 },
  { name: 'Lever 10: Content Distribution & Reach', questions: 3, totalScore: 15 },
  { name: 'Lever 11: Ideal Customer Profile (ICP) Clarity', questions: 2, totalScore: 10 },
  { name: 'Lever 12: Founder-Led Sales & Growth', questions: 3, totalScore: 15 },
  { name: 'Lever 13: The Human Factor', questions: 3, totalScore: 15 },
  { name: 'Lever 14: Dream 100 Clarity & Targeting', questions: 3, totalScore: 15 },
  { name: 'Lever 15: Empathy', questions: 3, totalScore: 15 },
  { name: 'Lever 16: Email Outreach Mastery', questions: 3, totalScore: 15 },
  { name: 'Lever 17: LinkedIn Engagement & Growth', questions: 3, totalScore: 15 },
  { name: 'Lever 18: Credibility & Authority Building', questions: 3, totalScore: 15 }
];

// Pillar definitions (use totalScore from levers) outside the function
const pillars = [
  { name: 'Content Mastery', levers: [0, 1, 2, 3], totalScore: levers[0].totalScore + levers[1].totalScore + levers[2].totalScore + levers[3].totalScore },
  { name: 'Strategy', levers: [4, 5, 6, 7, 8, 9], totalScore: levers[4].totalScore + levers[5].totalScore + levers[6].totalScore + levers[7].totalScore + levers[8].totalScore + levers[9].totalScore },
  { name: 'Engagement', levers: [10, 11, 12, 13, 14, 15, 16, 17], totalScore: levers[10].totalScore + levers[11].totalScore + levers[12].totalScore + levers[13].totalScore + levers[14].totalScore + levers[15].totalScore + levers[16].totalScore + levers[17].totalScore }
];

// Function to sort the table
function sortTable(columnIndex) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("rankedLeversTable");
  switching = true;
  // Set the sorting direction to ascending:
  let dir = "asc";

  let switchcount = 0; 

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[columnIndex];
      y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires="+ date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
}

// Function to delete a cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {

  // Load answers from cookies when the page loads
  loadAnswersFromCookies();

  // Step Navigation
  let currentStep = 1;

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const step5 = document.getElementById('step5');

  // Make the first step visible on page load
  step1.style.display = 'block';

  // Event listeners for "Save and Continue"
  document.getElementById('nextStep1').addEventListener('click', () => {
    saveAnswersToCookies();
    step1.style.display = 'none';
    step2.style.display = 'block';
    currentStep = 2;
  });

  document.getElementById('nextStep2').addEventListener('click', () => {
    saveAnswersToCookies();
    step2.style.display = 'none';
    step3.style.display = 'block';
    currentStep = 3;
  });

  document.getElementById('nextStep3').addEventListener('click', () => {
    saveAnswersToCookies();
    step3.style.display = 'none';
    step4.style.display = 'block';
    currentStep = 4;
  });

  document.getElementById('nextStep4').addEventListener('click', () => {
    saveAnswersToCookies();
    step4.style.display = 'none';
    step5.style.display = 'block';
    currentStep = 5;
  });

  // Event listeners for "Previous"
  document.getElementById('prevStep2').addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
    currentStep = 1;
  });

  document.getElementById('prevStep3').addEventListener('click', () => {
    step3.style.display = 'none';
    step2.style.display = 'block';
    currentStep = 2;
  });

  document.getElementById('prevStep4').addEventListener('click', () => {
    step4.style.display = 'none';
    step3.style.display = 'block';
    currentStep = 3;
  });

  document.getElementById('prevStep5').addEventListener('click', () => {
    step5.style.display = 'none';
    step4.style.display = 'block';
    currentStep = 4;
  });

  // Form submission
 document.getElementById('assessmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  deleteCookie('assessmentAnswers'); // Clear cookies after submission

  // Collect form data
  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send form data to Google Apps Script as plain text
  fetch('https://script.google.com/macros/s/AKfycbxEPJj65dk5KE4k-aFdtmeOjOwikNV0SqTTL8CYzGsDBiZBgpRU7G5Ql-6D7Eeg-pln/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())  // Parsing as text because we expect plain text
  .then(result => {
    const parsedResult = JSON.parse(result);
    if (parsedResult.result === "success") {
      updateChartAndResults(levers, pillars);
    } else {
      alert(`There was an error submitting the form. Version: ${parsedResult.version}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert(`There was an error submitting the form. Version: unknown`);
  });
});




  function updateChartAndResults(levers, pillars) {
    const leverAverages = levers.map((lever, leverIndex) => {
      let leverTotal = 0;
      let inputCounter = 0;

      let startIndex = 0;
      for (let j = 0; j < leverIndex; j++) {
        startIndex += levers[j].questions;
      }

      for (let i = startIndex; i < startIndex + lever.questions; i++) {
        const score = parseFloat(document.querySelectorAll('.lever-input')[i].value);

        if (!isNaN(score) && score >= 0 && score <= 5) {
          leverTotal += score;
          inputCounter++;
        } else {
          alert(`Invalid input for ${lever.name} Question ${inputCounter + 1}. Please enter a number between 0 and 5.`);
          return;
        }
      }

      return leverTotal / lever.questions;
    });

    const pillarScores = pillars.map(pillar => {
      let pillarTotal = 0;
      let totalPossibleScore = 0;
      let totalQuestionsInPillar = 0;

      pillar.levers.forEach(leverIndex => {
        let startIndex = 0;
        for (let j = 0; j < leverIndex; j++) {
          startIndex += levers[j].questions;
        }

        for (let i = startIndex; i < startIndex + levers[leverIndex].questions; i++) {
          pillarTotal += parseFloat(document.querySelectorAll('.lever-input')[i].value) || 0;
        }

        totalPossibleScore += levers[leverIndex].questions * 5;
        totalQuestionsInPillar += levers[leverIndex].questions;

      });

      const averageScore = pillarTotal / totalQuestionsInPillar;

      return {
        name: pillar.name,
        total: pillarTotal,
        percentage: (pillarTotal / totalPossibleScore) * 100,
        totalScore: totalPossibleScore,
        averageScore: averageScore
      };
    });




    let resultsHTML = '';
    pillarScores.forEach(pillar => {
      resultsHTML += `
        <div class="pillar-result">
          <strong>${pillar.name}</strong>
          <p>Total Possible Score: ${pillar.totalScore}</p>
          <p>Total Achieved Score: ${pillar.total.toFixed(2)}</p>
          <p class="percentage">Percentage: ${pillar.percentage.toFixed(2)}%</p>
          <p>Average Score: ${pillar.averageScore.toFixed(2)}</p> 
        </div>
      `;
    });
    document.getElementById('results').innerHTML = resultsHTML;

    const data = {
      labels: levers.map(lever => lever.name),
      datasets: [{
        label: 'Self-Assessment Scores',
        data: leverAverages,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    if (chart) {
      chart.data = data;
      chart.update();
    } else {
      const ctx = document.getElementById('assessmentChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r: {
              pointLabels: {
                display: true,
                font: {
                  size: 10
                }
              },
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }

    generateInsights(levers, leverAverages, pillarScores);

    // -------------------------
    // GAP ANALYSIS BAR CHART
    // -------------------------
    const gapAnalysisData = leverAverages.map((score, index) => ({
      lever: levers[index].name,
      gap: 5 - score
    }));

    // Get the container where you want to add the chart
    // const chartContainer = document.getElementById('GapAnalysisChart'); // Or any element inside .container
    const ctxGap = document.getElementById('gapAnalysisChart').getContext('2d'); 



    new Chart(ctxGap, {
      type: 'bar',
      data: {
        labels: gapAnalysisData.map(item => item.lever),
        datasets: [{
          label: 'Gap to Maximum Score',
          data: gapAnalysisData.map(item => item.gap),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        },
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Gap Analysis'
          }
        }
      }
    }); 

  }

  function generateInsights(levers, leverAverages, pillarScores) {
    const rankedLevers = [...leverAverages].map((score, index) => ({
      number: index + 1,
      name: levers[index].name,
      score: score,
      pillar: getPillarForLever(index, pillars)
    })).sort((a, b) => a.score - b.score);

    const top3Levers = rankedLevers.slice(0, 3);

    const quickWins = rankedLevers.slice(0, 9);
    const longTermFocus = rankedLevers.slice(9);

    const overallScore = pillarScores.reduce((sum, pillar) => sum + pillar.percentage, 0) / pillarScores.length;

    let insightsHTML = '<h2>Insights</h2>';

    insightsHTML += `
      <h3>Ranked Levers:</h3>
      <table id="rankedLeversTable">
        <thead>
          <tr>
            <th onclick="sortTable(0)">Lever #</th>
            <th onclick="sortTable(1)">Lever Name</th>
            <th onclick="sortTable(2)">Score</th>
            <th onclick="sortTable(3)">Pillar</th> 
          </tr>
        </thead>
        <tbody>
          ${rankedLevers.map(lever => `
            <tr>
              <td>${lever.number}</td>
              <td>${lever.name}</td>
              <td>${lever.score.toFixed(2)}</td>
              <td>${lever.pillar}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    insightsHTML += '<h3>Prioritized Action Plan (Top 3):</h3>';
    insightsHTML += '<ul>';
    top3Levers.forEach(lever => {
      insightsHTML += `<li>${lever.name}: ${getRecommendationsForLever(lever.name)}</li>`;
    });
    insightsHTML += '</ul>';

    // 3. Gap Analysis (Bar Chart) - Already created in updateChartAndResults

    insightsHTML += '<h3>Quick Wins:</h3>';
    insightsHTML += '<ul>';
    quickWins.forEach(lever => {
      insightsHTML += `<li>${lever.name}: ${lever.score.toFixed(2)}</li>`;
    });
    insightsHTML += '</ul>';

    insightsHTML += '<h3>Long-Term Focus:</h3>';
    insightsHTML += '<ul>';
    longTermFocus.forEach(lever => {
      insightsHTML += `<li>${lever.name}: ${lever.score.toFixed(2)}</li>`;
    });
    insightsHTML += '</ul>';

    insightsHTML += '<h3>Overall Assessment:</h3>';
    insightsHTML += `<p>Your overall score is: ${overallScore.toFixed(2)}%</p>`;
    insightsHTML += `<p>${getOverallFeedback(overallScore)}</p>`;

    document.getElementById('insights').innerHTML = insightsHTML;
  }

  function getPillarForLever(leverIndex, pillars) {
    for (const pillar of pillars) {
      if (pillar.levers.includes(leverIndex)) {
        return pillar.name;
      }
    }
    return "N/A";
  }

  function getRecommendationsForLever(leverName) {
    return `Here are some recommendations for improving ${leverName}...`;
  }

  function getOverallFeedback(overallScore) {
    if (overallScore >= 80) {
      return "You have a strong understanding of the growth levers!";
    } else if (overallScore >= 50) {
      return "You have a good foundation, but there are areas for improvement.";
    } else {
      return "Focus on improving your scores across the board.";
    }
  }

  // Function to save answers to cookies
  function saveAnswersToCookies() {
    const answers = {};
    document.querySelectorAll('.lever-input').forEach(input => {
      answers[input.id] = input.value;
    });
    setCookie('assessmentAnswers', JSON.stringify(answers), 7); // Store for 7 days
  }

  // Function to load answers from cookies
  function loadAnswersFromCookies() {
    const savedAnswers = getCookie('assessmentAnswers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      document.querySelectorAll('.lever-input').forEach(input => {
        if (answers[input.id]) {
          input.value = answers[input.id];
        }
      });
    }
  }
}); 



