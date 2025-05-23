from django.db import models
from core.managers import TaskManager

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    status = models.BooleanField(default=False)
    objects = TaskManager()

    def __str__(self):
        return self.name


