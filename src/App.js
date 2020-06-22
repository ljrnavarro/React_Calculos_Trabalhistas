import React, { Component } from 'react';
import css from './app.module.css';
import { formatNumber } from './helpers/format-helpers';
import { calculateSalaryFrom } from './helpers/salary';
import Bar from "./components/Bar";
import '../node_modules/react-vis/dist/style.css';
import { RadialChart } from 'react-vis';
import "../node_modules/react-vis/dist/legends/searchable-discrete-color-legend";
import InputLabel from './components/InputLabel';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0
    };
  }

  async componentDidMount() {

    this.setState({
      fullSalary: 1000
    });
  }

  handleUpdateFullSalary = (event) => {
    const newSalary = event.target.value;
    console.log("newSalary", formatNumber(newSalary));
    this.setState({ fullSalary: newSalary });
  };

  handleFormatValue = (value) => {
    return "R$ " + formatNumber(Number(value));
  }

  calculatePercent = (_outOff, _value) => {
    if (_value > 0) {
      var outOff = _outOff;
      var value = _value;
      var result = (value * 100) / outOff;
      return result.toFixed(2);
    }
    else return 0;
  }

  formtatPercentNumber = (_outOff, _value) => {

    if (_value > 0)
      return `(${this.calculatePercent(_outOff, _value)}%)`;
    else
      return '';
  }

  render() {
    const { fullSalary } = this.state;
    console.log("calcresultFunction", calculateSalaryFrom(fullSalary));
    const { baseINSS, baseIRPF, discountINSS, discountIRPF, netSalary } = calculateSalaryFrom(fullSalary);
    const dataChart = [
             {
               angle: netSalary, 
               label: "Salário Líquido",
               color: "#16a085",
              
             }, 
             { 
               angle: discountINSS, 
               label: 'Desconto INSS', 
               color:"#e67e22",
              
              },
              { 
               angle: discountIRPF, 
               label: 'Desconto IRPF',
               color:"#c0392b",
              
               },
               { 
                angle: fullSalary, 
                label: 'Salário Bruto',
                color:"#10a524"
                }
               
              ];

              const pStyle = {
                fontSize: '10px',
                fontWeight: 'bolder',
                textAlign: 'center'
              };

    return (
      <div className="container">
        <h1 className="center">
          Cálculos <em>Trabalhistas</em>
        </h1>
        <div className="col s12">
          <div className="row">
            <div className="col s7">
              <div className="row">
                <div className="input-field col s12">
                  <InputLabel
                  onChange={this.handleUpdateFullSalary}
                  disabled={false}
                  value={fullSalary}
                  type={"number"}
                  id ={"salarioBrutoInput"}
                  placeholder={"Entre com o salário Bruto"}
                  label={"Salário Bruto:"}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s3">
                <InputLabel
                  disabled={true}
                  value={this.handleFormatValue(baseINSS)}
                  type={"text"}
                  id ={"baseINSSInput"}
                  classNameInput={css.inputTextStyle}
                  placeholder={""}
                  label={"Base INSS:"}
                  classNameLabel={"active"}
                  />
                </div>
                <div className="input-field col s3">
                <InputLabel
                  disabled={true}
                  value={this.handleFormatValue(discountINSS) + ` ${this.formtatPercentNumber(fullSalary, discountINSS)}`}
                  type={"text"}
                  id ={"descontoINSSInput"}
                  classNameInput={css.baseDescontoINSSInputStyle}
                  placeholder={""}
                  label={"Desconto INSS:"}
                  classNameLabel={"active"}
                  />
                </div>

                <div className="input-field col s3">
                <InputLabel
                  disabled={true}
                  value={this.handleFormatValue(baseIRPF)}
                  type={"text"}
                  id ={"baseIRPFInput"}
                  classNameInput={css.inputTextStyle}
                  placeholder={""}
                  label={"Base IRPF:"}
                  classNameLabel={"active"}
                  />
                </div>

                <div className="input-field col s3">
                <InputLabel
                  disabled={true}
                  value={this.handleFormatValue(discountIRPF) + ` ${this.formtatPercentNumber(fullSalary, discountIRPF)}`}
                  type={"text"}
                  id ={"descontoIRPFInput"}
                  classNameInput={css.descontoIRPFInputStyle}
                  placeholder={""}
                  label={"Desconto IRPF:"}
                  classNameLabel={"active"}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s4">

                <InputLabel
                  disabled={true}
                  value={this.handleFormatValue(netSalary) + ` ${this.formtatPercentNumber(fullSalary, netSalary)}`}
                  type={"text"}
                  id ={"salLiquidoInput"}
                  classNameInput={css.liquidSalaryInputStyle}
                  placeholder={""}
                  label={"Salário Líquido:"}
                  classNameLabel={"active"}
                  />
                </div>
              </div>
            </div>
            <div className="col s3">
              {fullSalary > 0 &&
              (<RadialChart
                labelsStyle={pStyle}
                colorType="literal"
                animation
                showLabels={true}
                data={dataChart}
                width={250}
                height={250} />)
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Bar value={this.calculatePercent(fullSalary, discountINSS)} color="#e67e22" />
            <Bar value={this.calculatePercent(fullSalary, discountIRPF)} color="#c0392b" />
            <Bar value={this.calculatePercent(fullSalary, netSalary)} color="#16a085" />
          </div>
        </div>
      </div>
    );
  }
}
