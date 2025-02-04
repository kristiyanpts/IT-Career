class Garden {
  constructor(spaceAvailable) {
    this.spaceAvailable = spaceAvailable;
    this.plants = [];
    this.storage = [];
  }

  addPlant(plantName, spaceRequired) {
    if (this.spaceAvailable < spaceRequired) {
      throw new Error("Not enough space in the garden.");
    }
    this.plants.push({
      plantName,
      spaceRequired,
      ripe: false,
      quantity: 0,
    });
    this.spaceAvailable -= spaceRequired;
    return `The ${plantName} has been successfully planted in the garden.`;
  }

  ripenPlant(plantName, quantity) {
    let plantAvailability = this.plants.find((p) => p.plantName == plantName);

    if (!plantAvailability) {
      throw new Error(`There is no ${plantName} in the garden.`);
    }
    if (plantAvailability.ripe) {
      throw new Error(`The ${plantName} is already ripe.`);
    }
    if (quantity <= 0) {
      throw new Error("The quantity cannot be zero or negative.");
    }
    plantAvailability.ripe = true;
    plantAvailability.quantity += quantity;
    if (quantity === 1) {
      return `${quantity} ${plantName} has successfully ripened.`;
    }
    return `${quantity} ${plantName}s have successfully ripened.`;
  }

  harvestPlant(plantName) {
    let plantAvailability = this.plants.find((p) => p.plantName == plantName);

    if (!plantAvailability) {
      throw new Error(`There is no ${plantName} in the garden.`);
    }
    if (!plantAvailability.ripe) {
      throw new Error(
        `The ${plantName} cannot be harvested before it is ripe.`
      );
    }
    this.storage.push({
      plantName,
      quantity: plantAvailability.quantity,
    });
    this.spaceAvailable += plantAvailability.spaceRequired;
    this.plants.splice(this.plants.indexOf(plantAvailability), 1);
    return `The ${plantName} has been successfully harvested.`;
  }

  generateReport() {
    let output = [];
    output.push(`The garden has ${this.spaceAvailable} free space left.`);
    output.push(
      `Plants in the garden: ${this.plants
        .sort((a, b) => a.plantName.localeCompare(b.plantName))
        .map((p) => `${p.plantName}`)
        .join(", ")}`
    );
    this.storage.length > 0
      ? output.push(
          `Plants in storage: ${this.storage
            .map((p) => `${p.plantName} (${p.quantity})`)
            .join(", ")}`
        )
      : output.push("Plants in storage: The storage is empty.");
    return output.join("\n");
  }
}

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 200));
// console.log(myGarden.addPlant("olive", 50));

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 100));
// console.log(myGarden.addPlant("cucumber", 30));
// console.log(myGarden.ripenPlant("apple", 10));
// console.log(myGarden.ripenPlant("orange", 1));
// console.log(myGarden.ripenPlant("orange", 4));

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 100));
// console.log(myGarden.addPlant("cucumber", 30));
// console.log(myGarden.ripenPlant("apple", 10));
// console.log(myGarden.ripenPlant("orange", 1));
// console.log(myGarden.ripenPlant("olive", 30));

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 100));
// console.log(myGarden.addPlant("cucumber", 30));
// console.log(myGarden.ripenPlant("apple", 10));
// console.log(myGarden.ripenPlant("orange", 1));
// console.log(myGarden.ripenPlant("cucumber", -5));

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 200));
// console.log(myGarden.addPlant("raspberry", 10));
// console.log(myGarden.ripenPlant("apple", 10));
// console.log(myGarden.ripenPlant("orange", 1));
// console.log(myGarden.harvestPlant("apple"));
// console.log(myGarden.harvestPlant("olive"));

// const myGarden = new Garden(250);
// console.log(myGarden.addPlant("apple", 20));
// console.log(myGarden.addPlant("orange", 200));
// console.log(myGarden.addPlant("raspberry", 10));
// console.log(myGarden.ripenPlant("apple", 10));
// console.log(myGarden.ripenPlant("orange", 1));
// console.log(myGarden.harvestPlant("apple"));
// console.log(myGarden.harvestPlant("raspberry"));

const myGarden = new Garden(250);
console.log(myGarden.addPlant("apple", 20));
console.log(myGarden.addPlant("orange", 200));
console.log(myGarden.addPlant("raspberry", 10));
console.log(myGarden.ripenPlant("apple", 10));
console.log(myGarden.ripenPlant("orange", 1));
console.log(myGarden.harvestPlant("orange"));
console.log(myGarden.generateReport());
