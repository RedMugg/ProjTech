module.exports = students;

function students(){
    const student = {
        naam: "Stephan Kok",
        studentnmr: 500803769,
        klas: "TEC2"
    }

    return Object.values(student);
}