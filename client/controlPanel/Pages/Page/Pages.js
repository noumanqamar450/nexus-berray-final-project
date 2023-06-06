import PageList from "../../Components/Pages/PageList"

const Pages = () => {
    return (
        <div className="page">
            <h2 className="py-3">Pages</h2>
            <table className="table table-hover mt-5">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Modify Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <PageList/>
                </tbody>
            </table>
        </div>
    )
}

export default Pages