/* eslint-disable react/prop-types */
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({
  columns,
  tickets,
  onTicketClick,
  getTicketStatusInfo,
  actionsRenderer,
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <TableRow
            key={ticket.id}
            ticket={ticket}
            columns={columns}
            onTicketClick={onTicketClick}
            getTicketStatusInfo={getTicketStatusInfo}
            actionsRenderer={actionsRenderer}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
