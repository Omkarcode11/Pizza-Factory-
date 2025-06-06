class Queue {
  // Internal array to hold the items in the queue}
  private items: any[] = [];

  // Add an item to the end of the queue
  enqueue(item: any): void {
    this.items.push(item);
  }

  // Remove and return the item at the front of the queue
  dequeue(): any | undefined {
    return this.items.shift();
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.items.length;
  }
}

export default Queue;