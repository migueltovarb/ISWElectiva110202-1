from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Task
from core.serializers import TaskSerializer

class GetAllTasksView(APIView):
    def get(self, request):
        tasks = Task.objects.get_all_tasks()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

class GetTaskView(APIView):
    def get(self, request, task_id):
        task = Task.objects.get_task_by_id(task_id)
        if task is None:
            return Response(
                {"error": "Task not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskSerializer(task)
        return Response(serializer.data)

class CreateTaskView(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = Task.objects.create_task(
                name=serializer.validated_data['name'],
                description=serializer.validated_data['description']
            )
            return Response(
                TaskSerializer(task).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )

class UpdateTaskView(APIView):
    def put(self, request, task_id):
        task = Task.objects.get_task_by_id(task_id)
        if task is None:
            return Response(
                {"error": "Task not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            updated_task = Task.objects.update_task(
                task_id,
                **serializer.validated_data
            )
            return Response(TaskSerializer(updated_task).data)
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )

class DeleteTaskView(APIView):
    def delete(self, request, task_id):
        if Task.objects.delete_task(task_id):
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"error": "Task not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )

class ToggleTaskStatusView(APIView):
    def post(self, request, task_id):
        task = Task.objects.toggle_status(task_id)
        if task is None:
            return Response(
                {"error": "Task not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(TaskSerializer(task).data)
