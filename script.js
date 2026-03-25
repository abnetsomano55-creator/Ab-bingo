const container = document.getElementById('cards-container');

function generateAllCards() {
    container.innerHTML = ''; // የቆዩትን አጽዳ
    for (let i = 1; i <= 150; i++) {
        createCard(i);
    }
}

function createCard(id) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bingo-card';
    cardDiv.innerHTML = `<div class="card-id">ካርታላ #${id}</div>`;
    
    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid';
    
    const nums = getBingoNumbers();
    
    nums.forEach((num, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (index === 12) {
            cell.innerText = "FREE";
            cell.classList.add('free', 'marked');
        } else {
            cell.innerText = num;
            cell.onclick = () => cell.classList.toggle('marked');
        }
        gridDiv.appendChild(cell);
    });
    
    cardDiv.appendChild(gridDiv);
    container.appendChild(cardDiv);
}

function getBingoNumbers() {
    let cardNums = [];
    // ለእያንዳንዱ አምድ (B, I, N, G, O) ትክክለኛ የቁጥር ክልል መጠቀም
    const ranges = [[1,15], [16,30], [31,45], [46,60], [61,75]];
    
    ranges.forEach(range => {
        let col = [];
        while(col.length < 5) {
            let r = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
            if(!col.includes(r)) col.push(r);
        }
        cardNums.push(...col);
    });
    
    // አምዶቹን ወደ ረድፍ ለመቀየር (Transposing)
    let finalBoard = [];
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            finalBoard.push(cardNums[j*5 + i]);
        }
    }
    return finalBoard;
}

// ገጹ ሲከፈት 150ውንም እንዲያመጣ
generateAllCards();
