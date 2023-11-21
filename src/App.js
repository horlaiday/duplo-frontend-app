import {useEffect,useState} from 'react';
  
const Dashboard = () => {
  const APIURL = process.env.REACT_APP_APIURL || "http://localhost:5050";
    
  const[record,setRecord] = useState([])
  const [rs,setrs] = useState({
     id:'',
     name:'',
     email:'',
     website:'',
     order:[]
  })
  
   const getData = () =>
   {
	console.log("==APIURL==", APIURL);
       fetch(`${APIURL}/business/`)
			.then((resposne) => resposne.json())
			.then((res) => {
				return setRecord(res.data);
			});
   }
  
   useEffect(() => {
      getData();
   },[])
    
    const showDetail = (businessId) =>
    {
      fetch(`${APIURL}/order/${businessId}`)
			.then((resposne) => resposne.json())
			.then((res) => {
				return setrs(res.data);
			});
    }
  
  
    return (
		<div class="container mt-2">
			<div class="row mt-2 ">
				<div class="col-lg-1 col-md-6 col-sm-12"></div>
				<div class="col-lg-11 col-md-6 col-sm-12">
					<h4 class="mt-3 mb-3 text-secondary">
						List of Inventory Orders
					</h4>
					<div class=" mt-5">
						<table class="table table-striped table-sm">
							<thead class="thead-light">
								<tr>
									<th>No</th>
									<th>Name</th>
									<th>Email</th>
									<th>Website</th>
									<th>Order Details</th>
								</tr>
							</thead>
							<tbody>
								{record.map((business, index) => (
									<tr key={index}>
										<td>{business.id}</td>
										<td>{business.name}</td>
										<td>{business.email}</td>
										<td>{business.website}</td>
										<td>
											<button
												class="btn btn-primary"
												onClick={(e) =>
													showDetail(business._id)
												}
												data-bs-toggle="modal"
												data-bs-target="#myModal"
											>
												View Details
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="modal" id="myModal">
				<div class="modal-dialog" style={{ width: "700px" }}>
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								Employee Details
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<p>Total Number of Orders : {rs.totalOrders}</p>
							<p>Total Amount of Orders : {rs.totalAmount}</p>
							<p>
								Total Number of Orders Today :{" "}
								{rs.totalOrdersToday}
							</p>
							<p>
								Total Amount of Orders Today :{" "}
								{rs.totalAmountToday}
							</p>
						</div>

						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
  
export default Dashboard

