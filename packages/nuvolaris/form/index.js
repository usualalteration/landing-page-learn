//--kind nodejs:default
//--web true
function main(args) {
    let name = args.name || "world"
    return {
        "body": `Hello ${name}!`,
    }
}

