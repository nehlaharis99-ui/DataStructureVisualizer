/* =========================================================
   DATA STRUCTURE VISUALIZER
   FINAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".data-section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    const selected =
        document.getElementById(sectionName);

    if (selected) {
        selected.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   STACK
   ========================================================= */

let stack = [];

function pushStack() {

    const input =
        document.getElementById("stack-value");

    const value =
        input.value.trim();

    const message =
        document.getElementById("stack-message");


    if (value === "") {

        message.innerText =
            "Please enter a value.";

        return;
    }


    if (stack.length >= 5) {

        message.innerText =
            "Stack Overflow! Maximum 5 elements.";

        return;
    }


    stack.push(value);

    input.value = "";


    message.innerText =
        value + " pushed into the Stack.";


    displayStack();
}


function popStack() {

    const message =
        document.getElementById("stack-message");


    if (stack.length === 0) {

        message.innerText =
            "Stack Underflow! Stack is empty.";

        return;
    }


    const removed =
        stack.pop();


    message.innerText =
        removed + " popped from the Stack.";


    displayStack();
}


function displayStack() {

    const container =
        document.getElementById("stack-container");


    container.innerHTML = "";


    if (stack.length === 0) {

        container.innerHTML =
            '<p class="empty-message">Stack is Empty</p>';

        return;
    }


    /*
       Display from TOP to bottom.
       Last inserted element appears first.
    */

    for (
        let i = stack.length - 1;
        i >= 0;
        i--
    ) {

        const item =
            document.createElement("div");


        item.className =
            "stack-item";


        item.innerText =
            stack[i];


        container.appendChild(item);
    }
}


/* =========================================================
   QUEUE
   ========================================================= */

let queue = [];


function enqueue() {

    const input =
        document.getElementById("queue-value");

    const value =
        input.value.trim();

    const message =
        document.getElementById("queue-message");


    if (value === "") {

        message.innerText =
            "Please enter a value.";

        return;
    }


    if (queue.length >= 5) {

        message.innerText =
            "Queue Overflow! Maximum 5 elements.";

        return;
    }


    queue.push(value);

    input.value = "";


    message.innerText =
        value + " added to the Queue.";


    displayQueue();
}


function dequeue() {

    const message =
        document.getElementById("queue-message");


    if (queue.length === 0) {

        message.innerText =
            "Queue Underflow! Queue is empty.";

        return;
    }


    const removed =
        queue.shift();


    message.innerText =
        removed + " removed from the Queue.";


    displayQueue();
}


function displayQueue() {

    const container =
        document.getElementById("queue-container");


    container.innerHTML = "";


    if (queue.length === 0) {

        container.innerHTML =
            '<p class="empty-message">Queue is Empty</p>';

        return;
    }


    queue.forEach(function(value, index) {

        const item =
            document.createElement("div");


        item.className =
            "queue-item";


        item.innerText =
            value;


        /*
           Add visual information to
           FRONT and REAR elements.
        */

        if (index === 0) {

            item.title =
                "FRONT";
        }

        if (index === queue.length - 1) {

            item.title =
                "REAR";
        }


        container.appendChild(item);

    });
}


/* =========================================================
   EXPRESSION CONVERSION
   INFIX → POSTFIX
   ========================================================= */

function precedence(operator) {

    if (
        operator === "+" ||
        operator === "-"
    ) {
        return 1;
    }


    if (
        operator === "*" ||
        operator === "/"
    ) {
        return 2;
    }


    if (operator === "^") {

        return 3;
    }


    return 0;
}


function isOperator(symbol) {

    return (
        symbol === "+" ||
        symbol === "-" ||
        symbol === "*" ||
        symbol === "/" ||
        symbol === "^"
    );
}


function convertExpression() {

    const expression =
        document
            .getElementById("expression-input")
            .value
            .trim();


    const infixDisplay =
        document.getElementById(
            "infix-display"
        );


    const postfixDisplay =
        document.getElementById(
            "postfix-display"
        );


    const table =
        document.getElementById(
            "conversion-table"
        );


    const message =
        document.getElementById(
            "expression-message"
        );


    if (expression === "") {

        message.innerText =
            "Please enter an expression.";

        return;
    }


    let operatorStack = [];

    let postfix = "";


    table.innerHTML = "";


    infixDisplay.innerText =
        expression;


    for (
        let i = 0;
        i < expression.length;
        i++
    ) {

        const symbol =
            expression[i];


        if (symbol === " ") {

            continue;
        }


        /*
           Operand
        */

        if (
            !isOperator(symbol) &&
            symbol !== "(" &&
            symbol !== ")"
        ) {

            postfix += symbol;
        }


        /*
           Opening bracket
        */

        else if (symbol === "(") {

            operatorStack.push(symbol);
        }


        /*
           Closing bracket
        */

        else if (symbol === ")") {

            while (
                operatorStack.length > 0 &&
                operatorStack[
                    operatorStack.length - 1
                ] !== "("
            ) {

                postfix +=
                    operatorStack.pop();
            }


            if (
                operatorStack.length > 0
            ) {

                operatorStack.pop();
            }
        }


        /*
           Operator
        */

        else {

            while (
                operatorStack.length > 0 &&
                operatorStack[
                    operatorStack.length - 1
                ] !== "(" &&
                precedence(
                    operatorStack[
                        operatorStack.length - 1
                    ]
                ) >= precedence(symbol)
            ) {

                postfix +=
                    operatorStack.pop();
            }


            operatorStack.push(symbol);
        }


        addConversionRow(
            symbol,
            operatorStack,
            postfix
        );
    }


    /*
       Empty remaining stack
    */

    while (
        operatorStack.length > 0
    ) {

        postfix +=
            operatorStack.pop();
    }


    postfixDisplay.innerText =
        postfix;


    message.innerText =
        "Conversion completed successfully!";


    animateConversionRows();
}


function addConversionRow(
    symbol,
    stack,
    postfix
) {

    const table =
        document.getElementById(
            "conversion-table"
        );


    const row =
        document.createElement("tr");


    row.innerHTML =
        "<td>" +
        symbol +
        "</td>" +

        "<td>" +
        stack.join(" ") +
        "</td>" +

        "<td>" +
        postfix +
        "</td>";


    table.appendChild(row);
}


/*
   Highlight conversion rows
   one by one.
*/

function animateConversionRows() {

    const rows =
        document.querySelectorAll(
            "#conversion-table tr"
        );


    rows.forEach(function(row, index) {

        setTimeout(function() {

            row.classList.add(
                "step-active"
            );

            setTimeout(function() {

                row.classList.remove(
                    "step-active"
                );

            }, 500);

        }, index * 450);

    });
}


/* =========================================================
   POSTFIX EVALUATION
   ========================================================= */

function evaluatePostfix() {

    const expression =
        document
            .getElementById("postfix-input")
            .value
            .trim();


    const result =
        document.getElementById(
            "evaluation-result"
        );


    const table =
        document.getElementById(
            "evaluation-table"
        );


    table.innerHTML = "";


    if (expression === "") {

        result.innerText =
            "Please enter a postfix expression.";

        return;
    }


    let evaluationStack = [];


    for (
        let i = 0;
        i < expression.length;
        i++
    ) {

        const symbol =
            expression[i];


        if (symbol === " ") {

            continue;
        }


        /*
           Operand
        */

        if (!isNaN(symbol)) {

            evaluationStack.push(
                Number(symbol)
            );
        }


        /*
           Operator
        */

        else if (isOperator(symbol)) {

            if (
                evaluationStack.length < 2
            ) {

                result.innerText =
                    "Invalid postfix expression.";

                return;
            }


            const second =
                evaluationStack.pop();


            const first =
                evaluationStack.pop();


            let answer;


            if (symbol === "+") {

                answer =
                    first + second;
            }

            else if (symbol === "-") {

                answer =
                    first - second;
            }

            else if (symbol === "*") {

                answer =
                    first * second;
            }

            else if (symbol === "/") {

                answer =
                    first / second;
            }

            else if (symbol === "^") {

                answer =
                    Math.pow(
                        first,
                        second
                    );
            }


            evaluationStack.push(
                answer
            );
        }


        /*
           Invalid symbol
        */

        else {

            result.innerText =
                "Invalid symbol: " +
                symbol;

            return;
        }


        addEvaluationRow(
            symbol,
            evaluationStack
        );
    }


    if (
        evaluationStack.length !== 1
    ) {

        result.innerText =
            "Invalid postfix expression.";

        return;
    }


    result.innerText =
        "Final Result = " +
        evaluationStack[0];


    animateEvaluationRows();
}


function addEvaluationRow(
    symbol,
    stack
) {

    const table =
        document.getElementById(
            "evaluation-table"
        );


    const row =
        document.createElement("tr");


    row.innerHTML =
        "<td>" +
        symbol +
        "</td>" +

        "<td>" +
        stack.join(" ") +
        "</td>";


    table.appendChild(row);
}


/*
   Highlight evaluation rows.
*/

function animateEvaluationRows() {

    const rows =
        document.querySelectorAll(
            "#evaluation-table tr"
        );


    rows.forEach(function(row, index) {

        setTimeout(function() {

            row.classList.add(
                "step-active"
            );

            setTimeout(function() {

                row.classList.remove(
                    "step-active"
                );

            }, 500);

        }, index * 450);

    });
}


/* =========================================================
   LINKED LIST
   ========================================================= */

let linkedList = [];


function insertNode() {

    const input =
        document.getElementById(
            "list-value"
        );


    const value =
        input.value.trim();


    const message =
        document.getElementById(
            "list-message"
        );


    if (value === "") {

        message.innerText =
            "Please enter a value.";

        return;
    }


    linkedList.push(value);

    input.value = "";


    message.innerText =
        value +
        " inserted into the Linked List.";


    displayList();
}


function deleteNode() {

    const message =
        document.getElementById(
            "list-message"
        );


    if (
        linkedList.length === 0
    ) {

        message.innerText =
            "Linked List is empty.";

        return;
    }


    const removed =
        linkedList.pop();


    message.innerText =
        removed +
        " deleted from the Linked List.";


    displayList();
}


function displayList() {

    const container =
        document.getElementById(
            "linkedlist-container"
        );


    const message =
        document.getElementById(
            "list-message"
        );


    container.innerHTML = "";


    if (
        linkedList.length === 0
    ) {

        container.innerHTML =
            '<p class="empty-message">' +
            'Linked List is Empty' +
            '</p>';


        message.innerText =
            "Nothing to traverse.";

        return;
    }


    linkedList.forEach(
        function(value, index) {

            const node =
                document.createElement(
                    "div"
                );


            node.className =
                "node";


            node.innerHTML =
                '<div class="node-box">' +
                value +
                '</div>';


            if (
                index <
                linkedList.length - 1
            ) {

                node.innerHTML +=
                    '<div class="arrow">→</div>';
            }

            else {

                node.innerHTML +=
                    '<div class="arrow">→ NULL</div>';
            }


            container.appendChild(node);
        }
    );


    let traversal =
        "Traversal: ";


    for (
        let i = 0;
        i < linkedList.length;
        i++
    ) {

        traversal +=
            linkedList[i];


        if (
            i <
            linkedList.length - 1
        ) {

            traversal +=
                " → ";
        }
    }


    traversal +=
        " → NULL";


    message.innerText =
        traversal;
}


/*
   Animated Linked List Traversal
*/

function traverseLinkedList() {

    const nodes =
        document.querySelectorAll(
            "#linkedlist-container .node"
        );


    if (nodes.length === 0) {

        document.getElementById(
            "list-message"
        ).innerText =
            "Linked List is empty.";

        return;
    }


    nodes.forEach(function(node) {

        node.classList.remove(
            "highlight"
        );
    });


    nodes.forEach(
        function(node, index) {

            setTimeout(function() {

                node.classList.add(
                    "highlight"
                );


                setTimeout(function() {

                    node.classList.remove(
                        "highlight"
                    );

                }, 650);

            }, index * 800);
        }
    );


    const message =
        document.getElementById(
            "list-message"
        );


    message.innerText =
        "Traversing the Linked List...";
}


/* =========================================================
   OVERRIDE TRAVERSE BUTTON BEHAVIOUR
   ========================================================= */

/*
   The HTML button calls displayList().
   This wrapper makes Display/Traverse perform
   both redraw + animated traversal.
*/

const originalDisplayList =
    displayList;


displayList = function() {

    originalDisplayList();

    if (
        linkedList.length > 0
    ) {

        traverseLinkedList();
    }
};


/* =========================================================
   INITIAL STATE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayStack();

        displayQueue();

        displayList();

    }
);