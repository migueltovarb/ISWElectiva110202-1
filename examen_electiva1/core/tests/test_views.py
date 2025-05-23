import json
from django.test import TestCase
from rest_framework import status
from core.models import persons

class PersonApiTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.person = persons.objects.create(
            name='John',
            lastname='Doe',
            age=30,
            email='john.doe@example.com'
        )

    def test_obtener_todas_las_personas(self):
        response = self.client.get('/person/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("persons", response.json())  # Verifica que la clave "persons" exista

    def test_obtener_persona_por_nombre(self):
        response = self.client.get(f'/person/get/{self.person.name}/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("person", response.json())  # Verifica que la clave "person" exista
        self.assertEqual(response.json()["person"][0]["name"], self.person.name)

    def test_crear_persona(self):
        data = {
            'name': 'Jane',
            'lastname': 'Smith',
            'age': 25,
            'email': 'jane.smith@example.com'
        }
        response = self.client.post('/person/create/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        persona_encontrada = persons.objects.filter(email='jane.smith@example.com').first()
        self.assertIsNotNone(persona_encontrada)
        self.assertEqual(persona_encontrada.name, 'Jane')

    def test_actualizar_persona(self):
        data_actualizada = {
            'name': 'John Updated',
            'lastname': 'Doe Updated',
            'age': 35,
            'email': 'john.updated@example.com'
        }
        response = self.client.put(
            f'/person/update/{self.person.id}/',  # Corrige la ruta
            data=json.dumps(data_actualizada),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.person.refresh_from_db()
        self.assertEqual(self.person.name, 'John Updated')

    def test_eliminar_persona_existente(self):
        response = self.client.delete(f'/person/delete/{self.person.id}/')  # Corrige la ruta
        self.assertEqual(response.status_code, 200)
        self.assertFalse(persons.objects.filter(id=self.person.id).exists())

    def test_crear_persona_datos_invalidos(self):
        data_invalida = {
            'lastname': 'Doe',
            'age': 30,
            'email': 'invalid.email'
        }
        response = self.client.post('/person/create/', data_invalida)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.json())  # Verifica que el error esté relacionado con el campo "email"

    def test_eliminar_persona_inexistente(self):
        response = self.client.delete('/person/delete/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.json())  # Verifica que la clave "error" exista

