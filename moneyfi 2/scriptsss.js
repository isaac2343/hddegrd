let categories = [];

// Function to display the add category popup
function showAddCategoryPopup() {
    document.getElementById('addCategoryPopup').style.display = 'flex';
}

// Function to close the add category popup
function closeAddCategoryPopup() {
    document.getElementById('addCategoryPopup').style.display = 'none';
}

// Function to update the category list UI
function updateCategoryList() {
    const categoriesList = document.getElementById('categoriesList');
    categoriesList.innerHTML = '';
    categories.forEach((category, index) => {
        const progressClass = category.amount < 0 ? 'red' : category.amount >= category.goal ? 'green' : 'yellow';
        categoriesList.innerHTML += `
            <div class="goal-item">
                <span>${category.name}</span>
                <div class="progress-bar ${progressClass}" style="width: ${(category.amount / category.goal) * 100}%;">
                    $${category.amount} / $${category.goal || 'No Goal'}
                </div>
                <button onclick="addMoney(${index})">Add Money</button>
                <button onclick="addSubcategory(${index})">Add Subcategory</button>
            </div>
            <div id="subcategory${index}"></div>
        `;
    });
}

// Function to add a category
document.getElementById('addCategoryBtn').addEventListener('click', function() {
    const name = document.getElementById('newCategoryName').value;
    const goal = parseFloat(document.getElementById('goalAmount').value) || 0;

    if (name) {
        categories.push({ name, amount: 0, goal, subcategories: [] });
        updateCategoryList();
        closeAddCategoryPopup();
    } else {
        alert('Please enter a category name.');
    }
});

// Function to add money to a category
function addMoney(index) {
    const amount = parseFloat(prompt("Enter amount to add or subtract (negative values allowed):"));
    if (!isNaN(amount)) {
        categories[index].amount += amount;
        updateCategoryList();
    }
}

// Function to add a subcategory
function addSubcategory(index) {
    const subcategoryName = prompt("Enter subcategory name:");
    if (subcategoryName) {
        categories[index].subcategories.push({ name: subcategoryName, amount: 0 });
        updateSubcategoryList(index);
    }
}

// Function to update the subcategory UI
function updateSubcategoryList(index) {
    const subcategoryDiv = document.getElementById(`subcategory${index}`);
    subcategoryDiv.innerHTML = '';
    categories[index].subcategories.forEach((subcategory, subIndex) => {
        subcategoryDiv.innerHTML += `
            <div class="goal-item">
                <span>${subcategory.name}</span>
                <div class="progress-bar green" style="width: 100%;">$${subcategory.amount}</div>
                <button onclick="addMoneyToSubcategory(${index}, ${subIndex})">Add Money</button>
            </div>
        `;
    });
}

// Function to add money to a subcategory
function addMoneyToSubcategory(catIndex, subIndex) {
    const amount = parseFloat(prompt("Enter amount to add to subcategory:"));
    if (!isNaN(amount)) {
        categories[catIndex].subcategories[subIndex].amount += amount;
        updateSubcategoryList(catIndex);
    }
}
