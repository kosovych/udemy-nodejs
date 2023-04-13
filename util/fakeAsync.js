const fakeAsync = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 5000);
});

module.exports = fakeAsync;