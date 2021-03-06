import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CapDo extends Component {
  constructor () {
    super()

    this.state = {
        danhsachcapdo: [],
        tencapdo: '',
        phantram: '',
        sotiencapdo	: '',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewCapDo  = this.handleCreateNewCapDo.bind(this)
    this.handleDeleteCapDo  = this.handleDeleteCapDo.bind(this)
    this.handleChiTietCapDo  = this.handleChiTietCapDo.bind(this)
    this.handleUpdateCapDo = this.handleUpdateCapDo.bind(this)
  

  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })
    axios.get('/index.php/api/getcapdo').then(response => {
        this.setState({
          danhsachcapdo: response.data
        })
      })
   
  }
  componentDidMount() {
   
  }

  
  handleFieldChange (event) {
   

   var checkedArr = [];
   var value;
    if(event.target.type == 'checkbox')
    {
      
        const checkeds = document.getElementsByTagName('input');
        for (var i = 0; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
            checkedArr.push(checkeds[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
    }
    else if(event.target.type == 'file')
    {
    
      this.setState({
        [event.target.name]:event.target.files[0]
      })
    }
    else
    {
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  
  handleCreateNewCapDo (event) {
    event.preventDefault()

    const { history } = this.props

    const capdo = {
      tencapdo: this.state.tencapdo,
      phantram: this.state.phantram,
      sotiencapdo: this.state.sotiencapdo

    }
    console.log(capdo);
    axios.post('/index.php/api/themcapdo', capdo)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getcapdo').then(response => {
            this.setState({
              danhsachcapdo: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
      })
      .catch(error => {
        this.setState({
    
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteCapDo(event)
  {
      event.preventDefault()
      let idcapdo=event.target.attributes.getNamedItem('data-idcapdo').value

      axios.get('/index.php/api/xoacapdo/'+idcapdo)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getcapdo').then(response => {
            this.setState({
              danhsachcapdo: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietCapDo(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idcapdo').value
    axios.get('/index.php/api/getcapdotheoid/'+idpc).then(response => {
 
      document.getElementById("updatetencapdo").value = response.data[0]["tencapdo"]
      document.getElementById("updatephantram").value = response.data[0]["phantram"]
      document.getElementById("updatesotiencapdo").value = response.data[0]["sotiencapdo"]
      document.getElementById("updateid").value = response.data[0]["id"]

      this.setState({
        tencapdo: response.data[0]["tencapdo"],
        phantram: response.data[0]["phantram"],
        sotiencapdo: response.data[0]["sotiencapdo"],
        updateid: response.data[0]["id"]
      })
    })
   

 
  
   
  }
  handleUpdateCapDo(event)
  {
    event.preventDefault()
     const capdoupdate = {
      tencapdo: this.state.tencapdo,
      phantram: this.state.phantram,
      sotiencapdo: this.state.sotiencapdo
      }
      console.log(capdoupdate);
      axios.post('/index.php/api/capnhatcapdo/'+this.state.updateid,capdoupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getcapdo').then(response => {
            this.setState({
              danhsachcapdo: response.data
            })
          })
          var button = document.getElementById('btn-ends')
          button.click()
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-ends')
        button.click()
      })
      
    
  }

render () {
const { danhsachcapdo } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh s??ch c???p ?????
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>T??n c???p ?????</th>
              <th>Ph???n tr??m c???p ?????</th>
              <th>Doanh thu ?????t c???p ?????</th>
              
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
         
          <tbody>
          {danhsachcapdo.map(dv => ( 
            <tr id={"capdoitem"+dv.id} data-itemdv={dv.id}>
            
              <td data-iddv={dv.id}>{dv.tencapdo}</td>
              <td>{dv.phantram}</td>
              <td>{dv.sotiencapdo.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VN??</td>
              <td className="btnaction"><button data-idcapdo={dv.id} onClick={this.handleDeleteCapDo} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.id}><i className="fa fa-trash-o" data-idcapdo={dv.id}></i></button><button onClick={this.handleChiTietCapDo} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idcapdo={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" onClick={this.handleChiTietCapDo} data-idcapdo={dv.id}></i></button></td>
             
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">T???o c???p ?????</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewCapDo}>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">T??n c???p ?????</label>
              <input type="text" className="form-control" name="tencapdo" id="recipient-name1" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Ph???n tr??m</label>
              <input type="number" className="form-control" name="phantram" id="recipient-name2" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Doanh thu ?????t c???p ?????</label>
              <input type="number" className="form-control" name="sotiencapdo" id="recipient-name3" onChange={this.handleFieldChange} /> 
              </div>
     
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY L???I</button>
          <button type="submit" className="btn btn-primary" >L??U L???I</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">C???p Nh???t c???p ?????</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateCapDo}>
   
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">T??n c???p ?????</label>
              <input type="text" className="form-control" name="tencapdo" id="updatetencapdo" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Ph???n tr??m</label>
              <input type="number" className="form-control" name="phantram" id="updatephantram" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Doanh thu ?????t c???p ?????</label>
              <input type="text" className="form-control" name="sotiencapdo" id="updatesotiencapdo" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">id update</label>
              <input type="text" className="form-control" name="updateid" id="updateid" onChange={this.handleFieldChange} /> 
              </div>
           
          
         
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY L???I</button>
          <button type="submit" className="btn btn-primary" >L??U L???I</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  </div>
  )
}
}

export default CapDo