//--kind nodejs:default
//--web true
function main(args) {
    let name = args.name || "world"
    return {
        "body": {
            "message": `Hello ${name}!`
        },
        "headers": {
            "Content-Type": "application/json"
        }, 
        "statusCode": 200
    }
}

