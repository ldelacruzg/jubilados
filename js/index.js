const btnCalcular = document.querySelector("#btnCalcular");
const iptDuracionEmpleo = document.querySelector("#duracionEmpleo");
const iptEdadJubilado = document.querySelector("#edadJubilado");
const iptSalarioAnualActual = document.querySelector("#salarioAnualActual");

btnCalcular.addEventListener("click", (e) => {
  const jubilado = new Jubilado(
    parseInt(iptDuracionEmpleo.value),
    parseInt(iptEdadJubilado.value),
    parseFloat(iptSalarioAnualActual.value)
  );
  console.log(jubilado);

  if (!jubilado.validate()) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!jubilado.validateSalarioAnualActual()) {
    alert("El salario anual actual debe ser un número positivo");
    return;
  }

  const iptPorcentajeBonificacion = document.querySelector(
    "#porcentajeDeBonificacion"
  );
  const iptBonificacion = document.querySelector("#bonificacion");
  const iptTotal = document.querySelector("#total");

  const porcentajeBonificacion = jubilado.obtenerPorcentajeDeBonificacion();
  const bonificacion = jubilado.obtenerBonificacion();
  const total = jubilado.obtenerTotal();

  iptPorcentajeBonificacion.value = `${porcentajeBonificacion * 100} %`;
  iptBonificacion.value = `$ ${bonificacion.toFixed(2)}`;
  iptTotal.value = `$ ${total.toFixed(2)}`;
});

class Jubilado {
  constructor(duracionEmpleo, edadJubilado, salarioAnualActual) {
    this.edadJubilado = edadJubilado;
    this.duracionEmpleo = duracionEmpleo;
    this.salarioAnualActual = salarioAnualActual;
  }

  validate() {
    return (
      this.duracionEmpleo !== "" &&
      this.edadJubilado !== "" &&
      this.salarioAnualActual !== ""
    );
  }

  validateSalarioAnualActual() {
    return (
      this.salarioAnualActual >= 0 &&
      parseFloat(this.salarioAnualActual) !== NaN
    );
  }

  obtenerTotal() {
    return parseFloat(this.salarioAnualActual + this.obtenerBonificacion());
  }

  obtenerBonificacion() {
    return parseFloat(
      this.salarioAnualActual * this.obtenerPorcentajeDeBonificacion()
    );
  }

  obtenerPorcentajeDeBonificacion() {
    if (this.edadJubilado < 50 || this.duracionEmpleo < 5) {
      return 0;
    }

    const rangosBonificacion = [
      { duracion: 10, porcentaje: 0.2 },
      { duracion: 15, porcentaje: 0.3 },
      { duracion: 20, porcentaje: 0.4 },
      { duracion: 25, porcentaje: 0.5 },
    ];

    for (const rango of rangosBonificacion) {
      if (this.duracionEmpleo <= rango.duracion) {
        return rango.porcentaje;
      }
    }

    return 1;
  }
}
