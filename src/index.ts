import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/several";

createConnection()
  .then(async connection => {
    const userRepo = connection.getRepository(User);

    await userRepo.save({
      name: "User"
    });

    const user = await userRepo.findOneOrFail({
      where: { id: 1 },
      relations: ["userGroups", "userGroups.group"]
    });

    console.log(JSON.stringify(user, null, 2));
    // output:
    /*
{
  "id": 1,
  "name": "User",
  "userGroups": [
    {
      "isActive": null,
      "group": null
    }
  ]
}

 Why userGroups is not an empty array?
    */
  })
  .catch(error => console.log(error));
