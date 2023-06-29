let clickAlt = Boolean(1);
let initState = 1;
let arr = document.getElementsByClassName('cell');
let turn = document.getElementsByClassName("turn");

let clearGrid = () =>
{
    for (let i = 0; i < arr.length; i++)
    {
        arr[i].textContent = "";
        arr[i].disabled = false;
        arr[i].className = 'cell';
        arr[i].style.backgroundColor = '#ededed';
    }

    arr[0].className += " corner-top-left";
    arr[2].className += " corner-top-right";
    arr[6].className += " corner-bottom-left";
    arr[8].className += " corner-bottom-right";
    
    turn[0].style.color = "white";
    initState = !initState;
    clickAlt = initState;
    if (clickAlt)
    {
        turn[0].textContent = '✓ Turn';
    }

    else
    {
        turn[0].textContent = '✗ Turn';
    }
}

let disableAllCall = (text, highlight) =>
{
    for (let i = 0; i < arr.length; i++)
    {
        arr[i].disabled = true;
        arr[i].className += ' noHover';
    }

    if (text === '✓')
    {
        turn[0].style.color = "teal";
    }
    
    else
    {
        turn[0].style.color = "#ff2255"
    }

    turn[0].textContent = `${text} Won`;

    if (highlight)
    {
        for (let i = 0; i < highlight.length; i++)
        {
            if (text === '✓')
            {
                arr[highlight[i]].style.backgroundColor = "teal";
            }
            
            else
            {
                arr[highlight[i]].style.backgroundColor = "#ff2255";
                
            }
            arr[highlight[i]].style.transition = "background-color 1s linear";
        }

        for (let i = 0; i < arr.length; i++)
        {
            if (i !== highlight[0] && i !== highlight[1] && i !== highlight[2])
            {
                arr[i].style.backgroundColor = "#2222";
                arr[i].style.transition = "background-color 1s linear";
            }
        }
    }

    else 
    {
        for (let i = 0; i < arr.length; i++)
        {
            arr[i].style.backgroundColor = "rgb(245, 193, 49)";
            arr[i].style.transition = "background-color 1s linear";
        }
    }
}

let checkCombination = () =>
{
    let disableAll = false;
    let passingElement;
    let index;
    for (let i = 0; i < arr.length - 2;)
    {
        if (arr[i].textContent === '✓' || arr[i].textContent === '✗')
        {
            if(arr[i].textContent === arr[i + 1].textContent && arr[i].textContent === arr[i + 2].textContent)
            {
                disableAll = true;
                passingElement = arr[i];
                index = i;
                break;
            }
        }
        
        i += 3;
    }
    
    if (disableAll)
    {
        disableAllCall(passingElement.textContent, [index, index + 1, index + 2]);
        return;
    }
    
    for (let i = 0; i < arr.length/3; i++)
    {
        if (arr[i].textContent === '✓' || arr[i].textContent === '✗')
        {
            if(arr[i].textContent === arr[i + 3].textContent && arr[i].textContent === arr[i + 6].textContent)
            {
                disableAll = true;
                passingElement = arr[i];
                index = i;
                break;
            }
        }
    }
    
    if (disableAll)
    {
        disableAllCall(passingElement.textContent, [index, index + 3, index + 6]);
        return;
    }
    
    if (arr[0].textContent === '✓' || arr[0].textContent === '✗')
    {
        if (arr[0].textContent === arr[4].textContent && arr[0].textContent === arr[8].textContent)
        {
            index = 0;
            disableAll = true;
        }
    }
    
    if (disableAll)
    {
        disableAllCall(arr[0].textContent, [index, index + 4, index + 8]);
        return;
    }

    if (arr[2].textContent === '✓' || arr[2].textContent === '✗')
    {
        if (arr[2].textContent === arr[4].textContent && arr[2].textContent === arr[6].textContent)
        {  
            disableAllCall(arr[2].textContent, [2, 4, 6]);
            return;
        }
    }

    let tied = true;

    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i].textContent !== '✓' && arr[i].textContent !== '✗')
        {
            tied = false;
            break;
        }
    }

    if (tied)
    {
        disableAllCall(arr[2].textContent, null);
        turn[0].style.color = "rgb(245, 193, 49)";
        turn[0].textContent = "Tied. Restart to play again.";
        return;
    }
}

let displaySymbol = (number) =>
{
    if(clickAlt && !arr[number].disabled)
    {
        arr[number].textContent = "✓";
        turn[0].textContent = "✗ Turn";
    }
    
    else if (!arr[number].disabled)
    {
        arr[number].textContent = "✗";
        turn[0].textContent = "✓ Turn";
    }
    
    if (!arr[number].disabled)
    clickAlt = !clickAlt;
    
    arr[number].disabled = true;
    arr[number].className += ' noHover';
    checkCombination();
}