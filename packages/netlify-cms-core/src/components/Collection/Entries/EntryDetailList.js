import React from "react";
import { render } from "react-dom";
import { Link, withRouter} from 'react-router-dom';
import matchSorter from 'match-sorter'
import Moment from 'moment'

// Import React Table
import ReactTable from "react-table";
import reactTableStyle from "react-table/react-table.css";
import { injectGlobal } from 'react-emotion';

injectGlobal`
  ${reactTableStyle}
`;

class EntryDetailList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [ ...props.entry.toJS()
      ]
    };
  }
  render() {
    const { data } = this.state;
    console.log(data);

    return (
      <div>
        <ReactTable
          getTrProps={(state, rowInfo) => ({
            onClick: () => this.props.history.push(`/collections/${this.props.collection.get('name')}/entries/${rowInfo.row.slug}`)
          })}
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              // Header: "Name",
              columns: [
                {
                  Header: "Title",
                  accessor: "data.title",
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value),
                  // Cell: cell => {
                  //   return (
                  //     <Link to={`/collections/${this.props.collection.get('name')}/entries/${cell.row.slug}`} >{cell.row["data.title"]}<div className="styled" /> </Link>
                  //   );
                  // }
                },
                {
                  Header: "Slug",
                  accessor: "slug",
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                },
                {
                  id: "data.date",
                  Header: "Date",
                  accessor: d => {
                    return Moment(d.data.date)
                      .local()
                      .format("DD-MM-YYYY hh:mm:ss a")
                  }
                }
              ]
            },
            // {
            //   // Header: "Info",
            //   columns: [
            //     {
            //       Header: "Age",
            //       accessor: "age"
            //     },
            //     {
            //       Header: "Over 21",
            //       accessor: "age",
            //       id: "over",
            //       Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
            //       filterMethod: (filter, row) => {
            //         if (filter.value === "all") {
            //           return true;
            //         }
            //         if (filter.value === "true") {
            //           return row[filter.id] >= 21;
            //         }
            //         return row[filter.id] < 21;
            //       },
            //       Filter: ({ filter, onChange }) =>
            //         <select
            //           onChange={event => onChange(event.target.value)}
            //           style={{ width: "100%" }}
            //           value={filter ? filter.value : "all"}
            //         >
            //           <option value="all">Show All</option>
            //           <option value="true">Can Drink</option>
            //           <option value="false">Can't Drink</option>
            //         </select>
            //     }
            //   ]
            // }
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default withRouter(EntryDetailList);
