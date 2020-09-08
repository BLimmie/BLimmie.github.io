function pad(num, size) {
    return ('000000000' + num).substr(-size);
}

function get_time(time){
    let h = Math.trunc(time/60/60)
    let m = Math.trunc((time - h*60*60)/60)
    let s = Math.trunc(time - h*60*60 - m*60)
    let ms = Math.round((time % 1)*1000)
    return `${pad(h,2)}:${pad(m,2)}:${pad(s,2)}.${ms}`
}

async function get_game(game_id){
    let r = new Request(`https://www.speedrun.com/api/v1/games/${game_id}`)
    let resp = await fetch(r);
    let data = await resp.json()
    return data["data"]["names"]["international"]
}

async function get_category(run){
    let level_id = run["level"];
    let category_id = run["category"];
    let category_name = "";
    let level_name = "";
    if (level_id != null) {
        let r = new Request(`https://www.speedrun.com/api/v1/levels/${level_id}`);
        let resp = await fetch(r);
        let data = await resp.json();
        level_name = data["data"]["name"];
    }
    let r = new Request(`https://www.speedrun.com/api/v1/categories/${category_id}`);
    let resp = await fetch(r);
    let data = await resp.json();
    category_name = data["data"]["name"];
    return (level_id == null) ? `${category_name}` : `${level_name} IL: ${category_name}`;
}

async function clean_row(row){
    return {
        "Game": await get_game(row["run"]["game"]),
        "Category": await get_category(row["run"]),
        "Place": row["place"],
        "Time": get_time(row["run"]["times"]["primary_t"]),
        "Date": row["run"]["date"]
    }
}

async function clean(data){
    let result = []
    for (let row in data["data"]) {
        result.push(clean_row(data["data"][row]))
    }
    return await Promise.all(result)
}


function update_table(result) {
    let pre_tables = new Map()
    for (let row in result) {
        if (!pre_tables.has(result[row]["Game"])) {
            let new_row = Object.assign({},result[row]);
            delete new_row["Game"];
            pre_tables.set(result[row]["Game"], {table: result[row]["Game"], rows: [new_row]})
        } else {
            let new_row = Object.assign({},result[row]);
            delete new_row["Game"];
            let new_table = pre_tables.get(result[row]["Game"]);
            new_table.rows.push(new_row);
            pre_tables.set(result[row]["Game"], new_table);
        }
    }
    let tables = Array.from(pre_tables.values())
    for (let i in tables) {
        tables[i].rows = tables[i].rows.sort(function(a,b){
            if (!(a["Category"].includes("IL:") ^ b["Category"].includes("IL:"))) {
                return a["Date"] > b["Date"]
            } else if (a["Category"].includes("IL:")){
                return 1
            } else if (b["Category"].includes("IL:")){
                return -1
            } else {
                return 0
            }
        })
    }
    const columns = ["Category", "Place", "Time", "Date"];
    for (let t of tables) {
        const tableDiv = d3.select('#pb').append('div').attr('id', `tableContainer${t["table"]}`);
        tableDiv.append('h2').text(t["table"])
        const table = tableDiv.append('table').attr('class', 'table thead-dark table-bordered')
        const thead = table.append('thead')
        const tbody = table.append('tbody')
        console.log(t["table"])
        thead.append('tr')
            .selectAll('th')
            .data(columns)
            .enter()
            .append('th')
            .text(function(column) {return column;})

        const rows = tbody.selectAll('tr')
            .data(t["rows"])
            .enter()
            .append('tr')
            .attr('class', function (row) {
                console.log(row)
                return (row['Category'].includes("IL: "))? ('bg-primary') : ('bg-success')
            })

        const cells = rows.selectAll('td')
            .data(function (row) {
                return columns.map(function (column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append('td')
            .text(function(d){return d.value;})
    }
}

function httpGet(url) {
    let r = new Request(url)
    fetch(r).then(function(response){
        response.json().then(async function (data){
            let result = await clean(data)
            console.log(result)
            update_table(result)
            let elem = document.getElementById('loading-img')
            elem.parentNode.removeChild(elem)
        })
    })
}

httpGet("https://www.speedrun.com/api/v1/users/e8enkq78/personal-bests")

