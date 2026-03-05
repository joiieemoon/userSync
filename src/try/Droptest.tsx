import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

export function Droptest() {
  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle>Direct message</AccordionTitle>
        <AccordionContent>
          {filteredUsers.length === 0 ? (
            `No users found`
          ) : (
            <Virtuoso
              style={{ height: "100%" }}
              data={filteredUsers}
              itemContent={(index, user) => (
                <div
                  key={user.uid}
                  className="cursor-pointer rounded-md p-3 m-2 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
                >
                  <img
                    src={
                      user?.profilePhoto && user.profilePhoto !== ""
                        ? user.profilePhoto
                        : avtar
                    }
                    alt={user.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {user.firstName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {/* {user.email} */}
                    </span>
                  </div>
                </div>
              )}
            />
          )}
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
}
