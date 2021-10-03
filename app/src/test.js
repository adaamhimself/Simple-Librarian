module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        var employees = [];
    	var departments = [];
		try {
            fs.readFile("./data/employees.json", "utf8", (err, data) => {
                if (err)  reject("unable to read file");
                    const obj = JSON.parse(data);
                    employees = obj;
            });
            fs.readFile("./data/departments.json", "utf8", (err, data) => {
                if (err)  reject("unable to read file");
                    const obj = JSON.parse(data);
                    departments = obj;
            });
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
};
