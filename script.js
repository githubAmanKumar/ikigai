window.addEventListener('load', () => {
    setTimeout(() => {
        // Hide the loader
        document.getElementById('loader').style.display = 'none';

        // Show the main app content
        document.getElementById('app-content').style.display = 'block';
    }, 3000); // Simulates a 3-second load time for animation
});

const circles = document.querySelectorAll('.circle');
let selectedSection = '';
let skills = {
    "1. What You Love 🧡": [],
    "3. What the World Needs 🌍": [],
    "2. What You Are Good At 👍": [],
    "4. What You Can Be Paid For 💸": []
};

// Handling the circle click to select a section
circles.forEach(circle => {
    circle.addEventListener('click', (e) => {
        selectedSection = e.target.innerText;
        // console.log(selectedSection);
        
        document.getElementById('sectionTitle').innerText = selectedSection;
        document.getElementById('skill-input').style.display = 'block';
    });
});

// Function to add skill to the selected section
function addSkill() {
    const skillField = document.getElementById('skillField');
    const skill = skillField.value.trim();
    // console.log(skill);
    
    if (skill && selectedSection) {
        // Add the skill to the correct section
        skills[selectedSection].push(skill);

        // Display the skill in the list
        const skillsList = document.getElementById('skills-list');
        const skillItem = document.createElement('div');
        skillItem.innerText =skill;

        skillsList.appendChild(skillItem);

        skillField.value = ''; // Clear input field
    } else {
        alert('Please select a section and enter a skill.');
    }
}

function findIkigai() {
    const allSections = Object.values(skills);

    // Find common skills present in all sections
    const commonSkills = allSections.reduce((common, sectionSkills) => {
        return common.filter(skill => sectionSkills.includes(skill));
    }, allSections[0]);

    // If there are common skills in all sections, those are the Ikigai skills
    if (commonSkills.length > 0) {
        return commonSkills;
    }

    // If no skill is present in all sections, find the skill(s) that appear the most
    let skillCount = {};
    allSections.forEach(section => {
        section.forEach(skill => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
    });

    // Find the maximum occurrence count
    const maxCount = Math.max(...Object.values(skillCount));

    // Find all skills that have the maximum count
    const ikigaiSkills = Object.keys(skillCount).filter(skill => skillCount[skill] === maxCount);

    return ikigaiSkills;
}

// Handling the "Find Ikigai" button click
document.getElementById('ikigaiButton').addEventListener('click', () => {
    // Validate if the user has added at least some skills in any sections
    const ikigaiSkills = findIkigai();

    if (ikigaiSkills.length > 0) {
        // Display the Ikigai skills found
        const ikigaiResult = document.createElement('div');
        ikigaiResult.innerHTML = 
            `<h2>Your Ikigai could be:</h2>
            <p>${ikigaiSkills.join(', ')}</p>
        `;
        ikigaiResult.classList.add('ikigai-result');
        document.body.appendChild(ikigaiResult);

        // Optionally: Add some animation or transition for the result
        ikigaiResult.style.transform = 'scale(1.2)';
        setTimeout(() => {
            ikigaiResult.style.transform = 'scale(1)';
        }, 500);

    } else {
        alert("Please add skills to the sections to find your Ikigai.");
    }
});



const crossBtn = document.querySelector('.cross');
crossBtn.addEventListener('click', (e) => {
    e.target.nextSibling.parentNode.style.display = 'none';

})

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById('menuButton');
    const skillsList = document.getElementById('skills-list');

    // Initially hide the skills list
    skillsList.style.display = 'none';

    // Toggle skills list visibility when menu button is clicked
    menuButton.addEventListener('click', function () {
        if (skillsList.style.display === 'none') {
            skillsList.style.display = 'block'; // Show skills list
            // console.log(skillsList.innerHTML)
             // Show skills list
        } else {
            skillsList.style.display = 'none';  // Hide skills list
        }
    });
});