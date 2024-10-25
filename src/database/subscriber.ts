import { Author } from "src/authors/models/author.model";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class AuthorSubscriber implements EntitySubscriberInterface<Author> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this)
    }

    afterInsert(event: InsertEvent<any>): Promise<any> | void {
        console.warn('AFTER AUTHOR INSERTED: ', handleEntity(event))
    }

    afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
        console.warn('AFTER AUTHOR UPDATED: ', event.entity)
    }
}

const handleEntity = (event: InsertEvent<any>) => {
    if (event.entity instanceof Author) {
        return {
            id: event.entity.id,
            eventID: 'author.created'
        }
    }
    return 
}
