const container = document.querySelector(".container");
const coffees = [
    {
        name: "Perspiciatis",
        image: "images/coffee1.jpg"
    },
    {
        name: "Voluptatem",
        image: "images/coffee2.jpg"
    },
    {
        name: "Explicabo",
        image: "images/coffee3.jpg"
    },
    {
        name: "Rchitecto",
        image: "images/coffee4.jpg"
    },
    {
        name: " Beatae",
        image: "images/coffee5.jpg"
    },
    {
        name: " Vitae",
        image: "images/coffee6.jpg"
    },
    {
        name: "Inventore",
        image: "images/coffee7.jpg"
    },
    {
        name: "Veritatis",
        image: "images/coffee8.jpg"
    },
    {
        name: "Accusantium",
        image: "images/coffee9.jpg"
    }
];
const showCoffees = () => {
    let output = "";
    coffees.forEach(
        ({name, image}) =>
            (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
    );
    container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });

}

function getUserMedia(constraints) {
    // if Promise-based API is available, use it
    if (navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // otherwise try falling back to old, possibly prefixed API...
    var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (legacyApi) {
        // ...and promisify it
        return new Promise(function (resolve, reject) {
            legacyApi.bind(navigator)(constraints, resolve, reject);
        });
    }
}

function getStream(type) {
    if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {};
    constraints[type] = true;

    getUserMedia(constraints)
        .then(function (stream) {
            var mediaControl = document.querySelector(type);

            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            mediaControl.play();
        })
        .catch(function (err) {
            alert('Error: ' + err);
        });
}

var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
    verb = verb || 'updated';
    var newLocation = document.createElement('p');
    newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
    target.appendChild(newLocation);
}

if ('geolocation' in navigator) {

    document.getElementById('askButton').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (location) {
            appendLocation(location, 'fetched');
        });
        watchId = navigator.geolocation.watchPosition(appendLocation);
    });
} else {
    target.innerText = 'Geolocation API not supported.';
}


if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
    document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler(eventData) {
    var tiltLR = eventData.gamma;
    var tiltFB = eventData.beta;
    var dir = eventData.alpha;

    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(dir);

    var logo = document.getElementById("imgLogo");
    logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
    logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";

    if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate()
            .then(estimate => {
                document.getElementById('usage').innerHTML = estimate.usage;
                document.getElementById('quota').innerHTML = estimate.quota;
                document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
            });
    }

    if ('storage' in navigator && 'persisted' in navigator.storage) {
        navigator.storage.persisted()
            .then(persisted => {
                document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
            });
    }

    function requestPersistence() {
        if ('storage' in navigator && 'persist' in navigator.storage) {
            navigator.storage.persist()
                .then(persisted => {
                    document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
                });
        }
    }
}

if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate()
        .then(estimate => {
            document.getElementById('usage').innerHTML = estimate.usage;
            document.getElementById('quota').innerHTML = estimate.quota;
            document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
        });
}

if ('storage' in navigator && 'persisted' in navigator.storage) {
    navigator.storage.persisted()
        .then(persisted => {
            document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
        });
}

function requestPersistence() {
    if ('storage' in navigator && 'persist' in navigator.storage) {
        navigator.storage.persist()
            .then(persisted => {
                document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
            });
    }
};