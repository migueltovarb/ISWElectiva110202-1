from django.db import models

class TaskManager(models.Manager):
    def create_task(self, name, description):
        task = self.create(
            name=name,
            description=description,
            status=False
        )
        return task
    
    def get_all_tasks(self):
        return self.all()
    
    def get_task_by_id(self, task_id):
        try:
            return self.get(id=task_id)
        except self.model.DoesNotExist:
            return None
    
    def update_task(self, task_id, **kwargs):
        try:
            task = self.get(id=task_id)
            for key, value in kwargs.items():
                setattr(task, key, value)
            task.save()
            return task
        except self.model.DoesNotExist:
            return None
    
    def delete_task(self, task_id):
        try:
            task = self.get(id=task_id)
            task.delete()
            return True
        except self.model.DoesNotExist:
            return False
            
    def toggle_status(self, task_id):
        try:
            task = self.get(id=task_id)
            task.status = not task.status
            task.save()
            return task
        except self.model.DoesNotExist:
            return None

