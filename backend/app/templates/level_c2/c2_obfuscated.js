console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.defaultLog.apply(console, arguments);
    console.logs.push(Array.from(arguments));
    window.alert("You are {{level_session.finish_secret}}");
}
