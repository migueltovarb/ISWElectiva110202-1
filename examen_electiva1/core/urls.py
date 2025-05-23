from django.urls import path, include
from core.views import (
    GetAllTasksView,
    GetTaskView,
    CreateTaskView,
    UpdateTaskView,
    DeleteTaskView,
    ToggleTaskStatusView
)


urlpatterns = [
    path('tasks/', GetAllTasksView.as_view(), name='get_all_tasks'),
    path('tasks/<int:task_id>/', GetTaskView.as_view(), name='get_task'),
    path('tasks/create/', CreateTaskView.as_view(), name='create_task'),
    path('tasks/update/<int:task_id>/', UpdateTaskView.as_view(), name='update_task'),
    path('tasks/delete/<int:task_id>/', DeleteTaskView.as_view(), name='delete_task'),
    path('tasks/<int:task_id>/toggle-status/', ToggleTaskStatusView.as_view(), name='toggle_task_status'),
]
