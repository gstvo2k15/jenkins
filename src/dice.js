const one = `<pre>
-----
|   |
| o |
|   |
-----
</pre>`;
const two = `<pre>
-----
|o  |
|   |
|  o|
-----
</pre>`;
const three = `<pre>
-----
|o  |
| o |
|  o|
-----
</pre>`;
const four = `<pre>
-----
|o o|
|   |
|o o|
-----
</pre>`;
const five = `<pre>
-----
|o o|
| o |
|o o|
-----
</pre>`;
const six = `<pre>
-----
|o o|
|o o|
|o o|
-----
</pre>`;

const diceNumbers = [one, two, three, four, five, six];

module.exports = {
    roll: function () {
        return diceNumbers[Math.floor(Math.random()*diceNumbers.length)];
    }
};
