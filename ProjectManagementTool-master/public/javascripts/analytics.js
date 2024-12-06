function progressBar(canvasId) {

    var degreesCall;
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // declare some variables
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var progressColor = '#86a113';
    var circleColor = '#c6c6c6';

    var rawPerc = Number(document.getElementById('per').innerHTML);

    //console.log(rawPerc);
    var perc = parseInt(rawPerc);
    var degrees = 0;
    var endDegrees = (360 * perc) / 100;
    var lineWidth = 30; // The 'brush' size
    //console.log(canvasId + ' ' + perc);

    function drawProgressBar() {
        //clear the canvas after every instance
        ctx.clearRect(0, 0, cWidth, cHeight);
        //drawing the background circle
        ctx.beginPath();
        ctx.strokeStyle = circleColor;
        ctx.lineWidth = lineWidth - 1;
        ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0, Math.PI * 2, false);
        ctx.stroke();

        var radians = 0; // convert the degrees to radians
        radians = degrees * Math.PI / 180;

        //drawing the actual progressBar
        ctx.beginPath();
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        ctx.stroke();

        //text
        ctx.fillStyle = progressColor;
        ctx.font = '25px Arial';
        var outputTextPerc = Math.floor(degrees / 360 * 100) + '%';

        var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
        ctx.fillText(outputTextPerc, cWidth / 2 - outputTextPercWidth / 2, cHeight / 2 - 00);
    }

    function getDegrees() {
        if (degrees < endDegrees) {
            degrees++;
        }
        else {
            clearInterval(degreesCall);
        }
        drawProgressBar();
    }



    degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees));
}