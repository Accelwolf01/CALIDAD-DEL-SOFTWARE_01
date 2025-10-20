document.getElementById('evaluation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const funcionalidad = parseFloat(document.getElementById('funcionalidad').value);
    const usabilidad = parseFloat(document.getElementById('usabilidad').value);
    const mantenibilidad = parseFloat(document.getElementById('mantenibilidad').value);
    const eficiencia = parseFloat(document.getElementById('eficiencia').value);
    const portabilidad = parseFloat(document.getElementById('portabilidad').value);

    const total = funcionalidad + usabilidad + mantenibilidad + eficiencia + portabilidad;
    const average = total / 5;

    document.getElementById('result').innerText = `Puntaje total: ${total.toFixed(2)} / 25. Puntaje promedio: ${average.toFixed(2)} / 5.`;
});
